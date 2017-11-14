export const deleteTodoApi = (id) => {
	fetch('/api/todos', {
	      method: 'DELETE',
	      headers: {"Content-Type": "application/json"},
	      body : JSON.stringify({id})
	    }).then(res => {
	        if (res.ok) return res.json();
	    });
};

export const updateTodoApi = (id,todo) => {
	fetch('/api/todos', {
	      method: 'PUT',
	      headers: {"Content-Type": "application/json"},
	      body : JSON.stringify({id : id,todo : todo})
	   }).then(res => {
	        if (res.ok) return res.json();
	   });

};


export const createTodoApi = (todo) => {
	fetch('/api/todos', {
		method: 'POST',
		headers: {"Content-Type": "application/json"},
		body : JSON.stringify({todo})
	}).then(res => {
		if (res.ok) return res.json();
	});

};




