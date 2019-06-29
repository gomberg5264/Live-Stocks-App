import React, { Fragment } from 'react'
import styles from '../styles/stocksFlicker.scss'

const StocksFlicker = ({ stars }) => (
	<Fragment>
		<div className="stockFlicker">
			<span className="name" />
			<span className="price" />
		</div>
		<div className="stockFlicker">
			<span className="name" />
			<span className="price" />
		</div>
		<div className="stockFlicker">
			<span className="name" />
			<span className="price" />
		</div>
		<div className="stockFlicker">
			<span className="name" />
			<span className="price" />
		</div>
		<div className="stockFlicker">
			<span className="name" />
			<span className="price" />
		</div>
		<style jsx>{styles}</style>
	</Fragment>
)

export default StocksFlicker
