class TaskApp extends React.Component{
	constructor(props){
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
		}
	}

	componentDidMount(){
		if (typeof localStorage.tasks !== "undefined"){
			this.setState(() => ({
				tasks: JSON.parse(localStorage.tasks)
			}));
		}
	}

	addTask(e){
		e.preventDefault();
		if (this.state.newTask.length == 0){
			alert("Sorry, you must enter a task to add");
			return;
		}
		this.setState((prevState) => ({
			tasks: prevState.tasks.concat({name: this.state.newTask, complete: 0}),
			newTask: ""
		}));
	}

	taskChange(e){
		this.setState({newTask: e.target.value});
	}

	saveTasks(){
		localStorage.tasks = JSON.stringify(this.state.tasks);
		//TODO add alert
	}

	deleteTask(index){
		this.setState(prevState => ({
			tasks: prevState.tasks.filter((_, taskIndex) => index !== taskIndex)
		}));
	}

	completeTask(index){
		this.setState(function (prevState) {
			prevState.tasks[index].complete = 1;
			return {
				tasks: prevState.tasks
			}
		});
	}

	render(){
		return <div>
				<div className="row" id="header">
					<h3 className="col-md-10">Add a Task</h3>
					<button className="btn btn-primary col-md-2" onClick={() => this.saveTasks()}><span className="glyphicon glyphicon-floppy-disk"></span> Save Tasks</button>
				</div>
				<form onSubmit={(e) => this.addTask(e)}>
					<div className="input-group form-group">
						<input className="form-control" onChange={(e) => this.taskChange(e)} value={this.state.newTask}/>
						<div className="input-group-btn">
							<button className="btn btn-primary"><span className="glyphicon glyphicon-plus"></span> Add Task</button>
						</div>
					</div>
				</form>
				<ul className="list-group">
					{this.state.tasks.map(
						(item, index) => <li key={index} className={"list-group-item clearfix " + (item.complete == 1 ? "list-group-item-success" : "list-group-item-info")}>
									{item.name}
									{(item.complete == 1 ? "" : <button className="btn btn-success pull-right" onClick={() => this.completeTask(index)}><span className="glyphicon glyphicon-ok"></span> Complete</button>)}
									{<button className="btn btn-danger pull-right" onClick={() => this.deleteTask(index)}><span className="glyphicon glyphicon-trash"></span> Remove</button>}
								</li>
					)}
				</ul>
			</div>;
	}
}
//TODO - split the ul to its own thing

ReactDOM.render(<TaskApp />, document.getElementById("task-list-wrapper"));
