import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class CreateTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todo_title: "",
      todo_description: "",
      todo_priority: "",
      todo_completed: false,
      edit: false,

      todos: [
        // {
        //   id: 1,
        //   title: "Hello",
        //   desc: "Hii",
        //   priority: "Low",
        //   isCompleted: false,
        // },
        // {
        //   id: 2,
        //   title: "Title 2",
        //   desc: "Description 1",
        //   priority: "High",
        //   isCompleted: true,
        // },
      ],
    };
  }

  onHandleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      todos,
      todo_title,
      todo_description,
      todo_priority,
      todo_completed,
    } = this.state;
    const newTodo = {
      id: todos.length + 1,
      title: todo_title,
      desc: todo_description,
      priority: todo_priority,
      isCompleted: todo_completed,
    };
    if (
      todo_title.length <= 0 ||
      todo_description.length <= 0 ||
      todo_priority.length <= 0
    ) {
      return alert("Please fill all the fields");
    } else {
      this.setState({ todos: [...todos, newTodo] });

      return this.setState({
        todo_title: "",
        todo_description: "",

        todo_priority: "",
        // todo_completed: false,
      });
    }
  };

  handleCheck = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.isCompleted = !todo.isCompleted;
        }
        return todo;
      }),
    });
  };

  delTodo = (id) => {
    this.setState({
      todos: [...this.state.todos.filter((todo) => todo.id !== id)],
    });
    // console.log(id);
  };
  updateTodo = (id, e) => {
    console.log(id);
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id == id) {
          todo.title = e.target.value;
        }
        return todo;
      }),
    });
  };
  onEditHandle(event) {
    this.setState({
      edit: true,
      id: arguments[0],
      title: arguments[1],
      
    });
  }

  onUpdateHandle(event) {
    event.preventDefault();

    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === this.state.id) {
          todo['title'] = event.target.todo_title.value;
          return todo;
        }

        return todo;
      })
    });

    this.setState({
      edit: false
    });
  }

  onCompleteHandle() {
    let id = arguments[0];

    this.setState({
      mockData: this.state.mockData.map(item => {
        if (item.id === id) {
          item['done'] = true;
          return item;
        }

        return item;
      })
    });
  }

  // Render Edit or Update Form
  renderEditForm() {
    if (this.state.edit) {
      return (
        <form onSubmit={this.onUpdateHandle.bind(this)}>
          {" "}
          <input
            type="text"
            name="updatedItem"
            className="item"
            defaultValue={this.state.title}
          />{" "}
          <button  className="update-add-item">Update</button>{" "}
        </form>
      );
    }
  }

  render() {

    return (
      <div className=" pt-5">
        <h3>Create Todo</h3>
        {/* {this.renderEditForm()} */}
        <form onSubmit={ this.onSubmit}>
          <div className="form-group">
            <label>Title: </label>
            <input
              type="text"
              name="todo_title"
              className="form-control"
              value={this.state.todo_title}
              onChange={this.onHandleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              name="todo_description"
              className="form-control"
              value={this.state.todo_description}
              onChange={this.onHandleInputChange}
            />
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="todo_priority"
                id="priorityLow"
                value="Low"
                checked={this.state.todo_priority === "Low"}
                onChange={this.onHandleInputChange}
              />
              <label className="form-check-label">Low</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="todo_priority"
                id="priorityMedium"
                value="Medium"
                checked={this.state.todo_priority === "Medium"}
                onChange={this.onHandleInputChange}
              />
              <label className="form-check-label">Medium</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="todo_priority"
                id="High"
                value="High"
                checked={this.state.todo_priority === "High"}
                onChange={this.onHandleInputChange}
              />
              <label className="form-check-label">High</label>
            </div>
          </div>

          <div className="form-group">
            <button className="btn btn-primary">Add Todo</button>
          </div>
        </form>
        {/* <p>{this.state.todos.length}</p> */}

        {this.state.todos.length <= 0 ? (
          <h3 className="text-center" style={{ color: "crimson" }}>
            No Items Found
          </h3>
        ) : (
          this.state.todos.map((todo) => (
            <div key={todo.id} className="todoItem">
              <input
                type="checkbox"
                checked={todo.isCompleted ? "checked" : null}
                onChange={this.handleCheck.bind(this, todo.id)}
              />
              <div style={{ flex: "10", padding: "5px" }}>
                <h5
                  style={{
                    textDecoration:
                      todo.isCompleted == true ? "line-through" : "none",
                  }}
                >
                  {todo.title}
                </h5>
                <p
                  style={{
                    textDecoration:
                      todo.isCompleted == true ? "line-through" : "none",
                  }}
                >
                  {todo.desc}
                </p>
              </div>

              <p className="priority">{todo.priority[0]}</p>
              <button
                onClick={this.delTodo.bind(this, todo.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
              {/* <button
                onClick={this.onEditHandle.bind(this, todo.id, todo.title)}
                className="btn btn-success"
              >
                Update
              </button> */}
            </div>
          ))
        )}
      </div>
    );
  }
}

export default CreateTodo;
