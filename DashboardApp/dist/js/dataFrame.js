'use strict'
class DataFrameWrapper {
	constructor (dataFrame) {
        this._dataFrame = dataFrame
    }
	getDataFrame(){
		return this._dataFrame
	}
}