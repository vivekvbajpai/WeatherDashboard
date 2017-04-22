class MinBarChart extends BarChart{

	constructor(id,column,dataframe){
		super(id,column,dataframe);
	}

	getChartType(){
		return "minimum";
	}

	calculateFunction(df,column){
		return df.stat.min(column);
	}
}