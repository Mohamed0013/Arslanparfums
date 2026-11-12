#ifndef BITCOINEXCHANGE_HPP
# define BITCOINEXCHANGE_HPP

# include <map>
# include <string>

class BitcoinExchange
{
public:
	BitcoinExchange();
	BitcoinExchange(const BitcoinExchange& other);
	BitcoinExchange& operator=(const BitcoinExchange& other);
	~BitcoinExchange();

	void	loadDatabase(const std::string& filename);
	void	processInput(const std::string& filename);

private:
	std::map<std::string, double>	_db;

	bool	isValidDate(const std::string& date) const;
	double	getRate(const std::string& date) const;
};

#endif
