#include "BitcoinExchange.hpp"
#include <fstream>
#include <iostream>
#include <cstdlib>
#include <stdexcept>

BitcoinExchange::BitcoinExchange() {}

BitcoinExchange::BitcoinExchange(const BitcoinExchange& other) : _db(other._db) {}

BitcoinExchange& BitcoinExchange::operator=(const BitcoinExchange& other)
{
	if (this != &other)
		_db = other._db;
	return (*this);
}

BitcoinExchange::~BitcoinExchange() {}

/* ─── helpers ─────────────────────────────────────────────────────────────── */

static void stripCR(std::string& s)
{
	if (!s.empty() && s[s.size() - 1] == '\r')
		s.erase(s.size() - 1);
}

/* Return true if every character in [begin, end) is an ASCII digit. */
static bool allDigits(const std::string& s, size_t begin, size_t end)
{
	for (size_t i = begin; i < end; i++)
		if (s[i] < '0' || s[i] > '9')
			return (false);
	return (true);
}

/* ─── database loading ────────────────────────────────────────────────────── */

void BitcoinExchange::loadDatabase(const std::string& filename)
{
	std::ifstream file(filename.c_str());
	if (!file.is_open())
		throw std::runtime_error("Error: could not open database.");

	std::string line;
	std::getline(file, line); // skip header "date,exchange_rate"

	while (std::getline(file, line))
	{
		stripCR(line);
		if (line.empty())
			continue ;

		size_t pos = line.find(',');
		if (pos == std::string::npos)
			continue ;

		std::string date    = line.substr(0, pos);
		std::string rateStr = line.substr(pos + 1);

		char* end;
		double rate = std::strtod(rateStr.c_str(), &end);
		if (end == rateStr.c_str())
			continue ; // skip malformed row

		_db[date] = rate;
	}
}

/* ─── date validation ─────────────────────────────────────────────────────── */

bool BitcoinExchange::isValidDate(const std::string& date) const
{
	// Must be exactly "YYYY-MM-DD" (10 characters)
	if (date.size() != 10)
		return (false);
	if (date[4] != '-' || date[7] != '-')
		return (false);
	if (!allDigits(date, 0, 4) || !allDigits(date, 5, 7) || !allDigits(date, 8, 10))
		return (false);

	int year  = std::atoi(date.substr(0, 4).c_str());
	int month = std::atoi(date.substr(5, 2).c_str());
	int day   = std::atoi(date.substr(8, 2).c_str());

	if (year <= 0 || month < 1 || month > 12 || day < 1)
		return (false);

	int daysInMonth[] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
	// Leap year: divisible by 4, except centuries unless divisible by 400
	if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
		daysInMonth[1] = 29;

	if (day > daysInMonth[month - 1])
		return (false);

	return (true);
}

/* ─── rate lookup ─────────────────────────────────────────────────────────── */

/*
 * Returns the exchange rate for the given date.
 * If the exact date is not in the DB, the closest LOWER date is used.
 * Throws if no lower date exists (date is before the entire database).
 */
double BitcoinExchange::getRate(const std::string& date) const
{
	std::map<std::string, double>::const_iterator it = _db.lower_bound(date);

	// Exact match
	if (it != _db.end() && it->first == date)
		return (it->second);

	// No entry on or before this date
	if (it == _db.begin())
		throw std::runtime_error("Error: bad input => " + date);

	--it; // step back to the closest lower date
	return (it->second);
}

/* ─── input processing ────────────────────────────────────────────────────── */

void BitcoinExchange::processInput(const std::string& filename)
{
	std::ifstream file(filename.c_str());
	if (!file.is_open())
	{
		std::cerr << "Error: could not open file." << std::endl;
		return ;
	}

	std::string line;
	std::getline(file, line); // skip header "date | value"

	while (std::getline(file, line))
	{
		stripCR(line);
		if (line.empty())
			continue ;

		// ── 1. Locate the " | " separator ────────────────────────────────
		size_t pos = line.find(" | ");
		if (pos == std::string::npos)
		{
			std::cerr << "Error: bad input => " << line << std::endl;
			continue ;
		}

		std::string date     = line.substr(0, pos);
		std::string valueStr = line.substr(pos + 3);

		// ── 2. Validate date ──────────────────────────────────────────────
		if (!isValidDate(date))
		{
			std::cerr << "Error: bad input => " << date << std::endl;
			continue ;
		}

		// ── 3. Parse and validate value ───────────────────────────────────
		char*  end;
		double value = std::strtod(valueStr.c_str(), &end);

		// The entire string must have been consumed (no trailing garbage)
		if (end == valueStr.c_str() || *end != '\0')
		{
			std::cerr << "Error: bad input => " << line << std::endl;
			continue ;
		}
		if (value < 0)
		{
			std::cerr << "Error: not a positive number." << std::endl;
			continue ;
		}
		if (value > 1000)
		{
			std::cerr << "Error: too large a number." << std::endl;
			continue ;
		}

		// ── 4. Lookup rate and print result ───────────────────────────────
		try
		{
			double rate = getRate(date);
			std::cout << date << " => " << value << " = " << (value * rate) << std::endl;
		}
		catch (const std::exception& e)
		{
			std::cerr << e.what() << std::endl;
		}
	}
}
