class TaskApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [{
				name: "This task is completed",
				complete: 1
			}, {
				name: "This task is not complete",
				complete: 0
			}],
			newTask: ""
		};
	}

	componentDidMount() {
		this.setState(() => ({
			tasks: JSON.parse(localStorage.tasks)
		}));
	}

	addTask(e) {
		e.preventDefault();
		if (this.state.newTask.length == 0) {
			alert("Sorry, you must enter a task to add");
			return;
		}
		this.setState(prevState => ({
			tasks: prevState.tasks.concat({ name: this.state.newTask, complete: 0 }),
			newTask: ""
		}));
	}

	taskChange(e) {
		this.setState({ newTask: e.target.value });
	}

	saveTasks() {
		localStorage.tasks = JSON.stringify(this.state.tasks);
		//TODO add alert
	}

	deleteTask(index) {
		this.setState(prevState => ({
			tasks: prevState.tasks.filter((_, taskIndex) => index !== taskIndex)
		}));
	}

	completeTask(index) {
		this.setState(function (prevState) {
			prevState.tasks[index].complete = 1;
			return {
				tasks: prevState.tasks
			};
		});
	}

	render() {
		return React.createElement(
			"div",
			null,
			React.createElement(
				"div",
				{ className: "row", id: "header" },
				React.createElement(
					"h3",
					{ className: "col-md-10" },
					"Add a Task"
				),
				React.createElement(
					"button",
					{ className: "btn btn-primary col-md-2", onClick: () => this.saveTasks() },
					"Save Tasks"
				)
			),
			React.createElement(
				"form",
				{ onSubmit: e => this.addTask(e) },
				React.createElement(
					"div",
					{ className: "input-group form-group" },
					React.createElement("input", { className: "form-control", onChange: e => this.taskChange(e), value: this.state.newTask }),
					React.createElement(
						"div",
						{ className: "input-group-btn" },
						React.createElement(
							"button",
							{ className: "btn btn-primary" },
							"Add Task"
						)
					)
				)
			),
			React.createElement(
				"ul",
				{ className: "list-group" },
				this.state.tasks.map((item, index) => React.createElement(
					"li",
					{ key: index, className: "list-group-item clearfix " + (item.complete == 1 ? "list-group-item-success" : "list-group-item-info") },
					item.name,
					item.complete == 1 ? "" : React.createElement(
						"button",
						{ className: "btn btn-success pull-right", onClick: () => this.completeTask(index) },
						"Complete"
					),
					React.createElement(
						"button",
						{ className: "btn btn-danger pull-right", onClick: () => this.deleteTask(index) },
						"Remove"
					)
				))
			)
		);
	}
}
//TODO - split the ul to its own thing

ReactDOM.render(React.createElement(TaskApp, null), document.getElementById("task-list-wrapper"));