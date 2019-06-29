import React, { Fragment, Component } from 'react'
import styles from '../styles/stocktable.scss'
import StocksFlicker from './StocksFlicker'
let Chart

class StockTable extends Component {
	state = {
		appIsMounted: false,
		search: ''
	}
	async componentDidMount() {
		let result = await import('react-apexcharts')
		Chart = result.default
		this.setState({
			appIsMounted: true
		})
	}
	setSearch(search) {
		this.setState({
			search
		})
	}
	render() {
		const { stocks = {}, price = {}, selectedStock = '', setStock } = this.props
		return (
			<Fragment>
				<div className="StockTable">
					<div className="menu">
						{Object.keys(stocks).length == 0 && <StocksFlicker />}
						{Object.keys(stocks)
							.filter(
								stock =>
									stock && stock.toLowerCase().includes(this.state.search)
							)
							.map((stock, key) => {
								const status =
									price[stock] &&
									price[stock][price[stock].length - 2] > stocks[stock].price
										? 'red'
										: 'green'
								const options = {
									colors: ['#000000'],
									tooltip: {
										enabled: false
									},
									chart: {
										zoom: {
											enabled: false
										},
										toolbar: {
											show: false
										}
									},
									dataLabels: {
										enabled: false
									},
									stroke: {
										curve: 'straight'
									},
									grid: {
										show: false
									},
									xaxis: {
										labels: {
											show: false
										},
										axisBorder: {
											show: false
										}
									},
									yaxis: {
										labels: {
											show: false
										},
										axisBorder: {
											show: false
										}
									}
								}
								const series = [
									{
										data: price[stock]
									}
								]
								return (
									<div
										key={key}
										className={`${selectedStock === stock ? 'active' : ''}`}
										onClick={() => setStock(stock)}
									>
										<div className="name">{stocks[stock].name}</div>
										<div className="chart">
											{price[stock] &&
												price[stock].length > 3 &&
												this.state.appIsMounted && (
													<Chart
														options={options}
														series={series}
														type="bar"
														width={150}
														height={100}
													/>
												)}
											{price[stock] && price[stock].length <= 3 && (
												<div className="flicker" />
											)}
										</div>
										<div className={`price ${status}`}>
											${Number(stocks[stock].price).toFixed(2)}
										</div>
										<div className="text-clear" />
									</div>
								)
							})}
					</div>
				</div>
				<style jsx>{styles}</style>
			</Fragment>
		)
	}
}

export default StockTable
