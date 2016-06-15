import 'whatwg-fetch';

class authApi {
	static login() {

		let request = {
			method: 'POST', 
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				"Authorization": 'Basic d3dlYmFuZHJvaWQ6d3dlYmFuZHJvaWRzZWNyZXQ='
			},
			body: 'username=olekbinczyk&password=qwe&grant_type=password'
		};
		
		// Now use it!
		return fetch('http://auth-dziadzior.rhcloud.com/oauth/token', request).then(parseJSON)
			.then(data => {
				console.log(data);
				return data;
			});

		function parseJSON(res) {
			return res.json();
		}
	}
}

export default authApi;