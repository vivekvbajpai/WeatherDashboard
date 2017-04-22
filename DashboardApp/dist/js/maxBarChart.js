class MaxBarChart extends BarChart{

	constructor(id,column,dataframe){
		super(id,column,dataframe);
	}

	getChartType(){
		return "maximum";
	}

	calculateFunction(df,column){
		return df.stat.max(column);
	}
}