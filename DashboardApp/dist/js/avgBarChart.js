class AvgBarChart extends BarChart{

	constructor(id,column,dataframe){
		super(id,column,dataframe);
	}

	getChartType(){
		return "Average";
	}

	calculateFunction(df,column){
		return df.stat.mean(column);
	}
}