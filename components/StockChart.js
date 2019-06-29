import React, { Fragment, Component } from 'react'
import styles from '../styles/stockchart.scss'
let Chart

class StockChart extends Component {
	state = {
		appIsMounted: false
	}
	async componentDidMount() {
		let result = await import('react-apexcharts')
		Chart = result.default
		this.setState({
			appIsMounted: true
		})
	}
	render() {
		const { stocks = {}, price = {}, selectedStock } = this.props
		const options = {
			colors: ['#000000'],
			tooltip: {
				enabled: true,
				style: {
					fontSize: '12px',
					fontFamily: "'Open Sans', sans-serif"
				},
				x: {
					show: true,
					formatter: function(val, opts) {
						return `$${Number(val).toFixed(2)}`
					}
				},
				y: {
					title: {
						formatter: seriesName => seriesName
					}
				},
				marker: {
					show: true
				}
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
				enabled: true,
				formatter: function(val, opts) {
					return `$${Number(val).toFixed(2)}`
				}
			},
			stroke: {
				curve: 'straight'
			},
			grid: {
				show: true
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
				name: selectedStock.toUpperCase(),
				data: price[selectedStock]
			}
		]
		return (
			<Fragment>
				<div className="stockchart">
					{stocks[selectedStock] && (
						<h1 className="price">{selectedStock && selectedStock.toUpperCase()} with {`$${Number(
							stocks[selectedStock].price
						).toFixed(2)} `}</h1>
					)}
					<div className="chart">
						{price[selectedStock] && (
							<Chart
								options={options}
								series={series}
								type="line"
								width={'100%'}
								height={400}
							/>
						)}
					</div>
					<div className="about">
						<h1>(Live) Stocks App to display live stock data</h1>
					</div>
				</div>
				<style jsx>{styles}</style>
			</Fragment>
		)
	}
}

export default StockChart
