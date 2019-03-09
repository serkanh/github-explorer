var axios = require('axios');
var labels = ['security','js']
module.exports={
	fetchReposWithLabels:fetchReposWithLabels
}

function fetchReposWithLabels(){
	return axios.get('https://api.github.com/search/repositories?q=topic:dns+topic:security+topic:hacking')
	.then(function(response){
		return response.data.items
	})
	.then(function(data){
		data.map(function(element){
			console.log('==============')
			console.log(element.html_url)
			console.log(element.description)
			console.log('==============')
		})
	})
}
fetchReposWithLabels()