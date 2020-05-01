require( "dotenv" ).config();

var fs = require( "fs" );
var fetch = require( "node-fetch" );
var Web = require( "webwebweb" );
const AnomalyDetector = require('@azure/cognitiveservices-anomalydetector');
const msRest = require('@azure/ms-rest-js');
let credentials = new msRest.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': process.env.AZURE_KEY } });
let anomalyDetectorClient = new AnomalyDetector.AnomalyDetectorClient(credentials, "https://westus2.api.cognitive.microsoft.com");

var cities = JSON.parse( fs.readFileSync( "web/cities.json" ) );

const noaaUrl = "https://www.ncdc.noaa.gov/cdo-web/api/v2";
async function analyzeData( cityname, datatype ) {
	// find city
	let city = cities.find( x => x.name.toLowerCase().startsWith( cityname.toLowerCase() ) );
	if( city ) {
		try {
			let endDate = new Date();
			let startDate = new Date( endDate.getTime() - 1000 * 60 * 60 * 24 * 3 ); // 3 days ago
			let recentData = await fetch( `${noaaUrl}/data?datasetid=GHCND&datatypeid=${datatype}&locationid=${city.id}&startdate=${startDate.toISOString()}&enddate=${endDate.toISOString()}&limit=1`, {
				headers: {
					"token": process.env.NOAA_KEY
				}
			} ).then( r => r.json() );
			let station = recentData.results[ 0 ].station;
			startDate = new Date( endDate.getTime() - 1000 * 60 * 60 * 24 * 92 ); // 92 days ago (to ensure getting 3 full months of data)
			let data = await fetch( `${noaaUrl}/data?datasetid=GHCND&datatypeid=${datatype}&locationid=${city.id}&stationid=${station}&startdate=${startDate.toISOString()}&enddate=${endDate.toISOString()}&limit=1000`, {
				headers: {
					"token": process.env.NOAA_KEY
				}
			} ).then( r => r.json() );
			// let data = { results: [{"date":"2020-03-31T00:00:00","datatype":"TMAX","station":"GHCND:USC00450872","attributes":",,H,0800","value":94},{"date":"2020-04-01T00:00:00","datatype":"TMAX","station":"GHCND:USC00450872","attributes":",,H,0800","value":111},{"date":"2020-04-02T00:00:00","datatype":"TMAX","station":"GHCND:USC00450872","attributes":",,H,0800","value":111},{"date":"2020-04-03T00:00:00","datatype":"TMAX","station":"GHCND:USC00450872","attributes":",,H,0800","value":117},{"date":"2020-04-05T00:00:00","datatype":"TMAX","station":"GHCND:USC00450872","attributes":",,H,0800","value":117},{"date":"2020-04-06T00:00:00","datatype":"TMAX","station":"GHCND:USC00450872","attributes":",,H,0800","value":133},{"date":"2020-04-08T00:00:00","datatype":"TMAX","station":"GHCND:USC00450872","attributes":",,H,0800","value":156},{"date":"2020-04-09T00:00:00","datatype":"TMAX","station":"GHCND:USC00450872","attributes":",,H,0800","value":167},{"date":"2020-04-10T00:00:00","datatype":"TMAX","station":"GHCND:USC00450872","attributes":",,H,0800","value":206},{"date":"2020-04-11T00:00:00","datatype":"TMAX","station":"GHCND:USC00450872","attributes":",,H,0800","value":189},{"date":"2020-04-12T00:00:00","datatype":"TMAX","station":"GHCND:USC00450872","attributes":",,H,0800","value":156},{"date":"2020-04-13T00:00:00","datatype":"TMAX","station":"GHCND:USC00450872","attributes":",,H,0800","value":161},{"date":"2020-04-15T00:00:00","datatype":"TMAX","station":"GHCND:USC00450872","attributes":",,H,0800","value":189},{"date":"2020-04-16T00:00:00","datatype":"TMAX","station":"GHCND:USC00450872","attributes":",,H,0800","value":189},{"date":"2020-04-17T00:00:00","datatype":"TMAX","station":"GHCND:USC00450872","attributes":",,H,0800","value":211},{"date":"2020-04-18T00:00:00","datatype":"TMAX","station":"GHCND:USC00450872","attributes":",,H,0800","value":206},{"date":"2020-04-19T00:00:00","datatype":"TMAX","station":"GHCND:USC00450872","attributes":",,H,0800","value":144},{"date":"2020-04-20T00:00:00","datatype":"TMAX","station":"GHCND:USC00450872","attributes":",,H,0800","value":178},{"date":"2020-04-21T00:00:00","datatype":"TMAX","station":"GHCND:USC00450872","attributes":",,H,0800","value":194},{"date":"2020-04-22T00:00:00","datatype":"TMAX","station":"GHCND:USC00450872","attributes":",,H,0800","value":156},{"date":"2020-04-23T00:00:00","datatype":"TMAX","station":"GHCND:USC00450872","attributes":",,H,0800","value":122},{"date":"2020-04-24T00:00:00","datatype":"TMAX","station":"GHCND:USC00450872","attributes":",,H,0800","value":161},{"date":"2020-04-25T00:00:00","datatype":"TMAX","station":"GHCND:USC00450872","attributes":",,H,0800","value":156},{"date":"2020-04-26T00:00:00","datatype":"TMAX","station":"GHCND:USC00450872","attributes":",,H,0800","value":172},{"date":"2020-04-27T00:00:00","datatype":"TMAX","station":"GHCND:USC00450872","attributes":",,H,0800","value":172},{"date":"2020-04-28T00:00:00","datatype":"TMAX","station":"GHCND:USC00450872","attributes":",,H,0800","value":172}] };
			let filteredData = data.results.filter( x => x.station === station );
			let inputData = filteredData.map( x => ({ timestamp: new Date( x.date.split('.')[0]+"Z" ), value: x.value }) );
			// return inputData;
		    // Make the call to detect anomalies in whole series of points
		    let response = await anomalyDetectorClient.entireDetect( { series: inputData, granularity: 'daily', sensitivity: 95 } );
			let finalData = filteredData.map( (x, i) => ({
				date: x.date,
				station: x.station,
				value: x.value,
				expected: response.expectedValues[ i ],
				upperMargin: response.upperMargins[ i ],
				lowerMargin: response.lowerMargins[ i ],
				isAnomaly: response.isAnomaly[ i ],
				isNegativeAnomaly: response.isNegativeAnomaly[ i ],
				isPositiveAnomaly: response.isPositiveAnomaly[ i ],
			}));
			// console.log( response );
			return finalData;
		}
		catch( err ) {
			console.log( err );
			return { error: err };
		}
	}
	return {};
}
Web.APIs[ "/noaa/tmax" ] = async ( qs, body, opts ) => {
	return await analyzeData( qs.city, "TMAX" );
};
Web.APIs[ "/noaa/tmin" ] = async ( qs, body, opts ) => {
	return await analyzeData( qs.city, "TMIN" );
};
Web.APIs[ "/noaa/tavg" ] = async ( qs, body, opts ) => {
	return await analyzeData( qs.city, "TAVG" );
};
Web.APIs[ "/noaa/rain" ] = async ( qs, body, opts ) => {
	return await analyzeData( qs.city, "PRCP" );
};
Web.APIs[ "/noaa/weather" ] = async ( qs, body, opts ) => {
	if( qs.city ) {
		// find city
		let city = cities.find( x => x.name.toLowerCase().startsWith( qs.city.toLowerCase() ) );
		if( city ) {
			try {
				let endDate = new Date();
				let startDate = new Date( endDate.getTime() - 1000 * 60 * 60 * 24 * 9 ); // 9 days ago (to ensure getting a full week of data)
				let data = await fetch( `${noaaUrl}/data?datasetid=GHCND&datatypeid=TAVG&datatypeid=TMIN&datatypeid=TMAX&locationid=${city.id}&startdate=${startDate.toISOString()}&enddate=${endDate.toISOString()}&limit=1000`, {
					headers: {
						"token": process.env.NOAA_KEY
					}
				} ).then( r => r.json() );
				return data;
			}
			catch( err ) {
				console.log( err );
				return { error: err };
			}
		}
	}
	return {};
};
Web.APIs[ "/noaa/datasets" ] = async ( qs, body, opts ) => {
	let data = await fetch( `${noaaUrl}/datasets`, {
		headers: {
			"token": process.env.NOAA_KEY
		}
	} ).then( r => r.json() );
	return data;
};
Web.APIs[ "/noaa" ] = async ( qs, body, opts ) => {
	let data = await fetch( qs.url, {
		headers: {
			"token": process.env.NOAA_KEY
		}
	} ).then( r => r.json() );
	return data;
};
Web.Run( 5120 );
