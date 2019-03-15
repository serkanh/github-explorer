var React = require("react");

class Labelinput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //TODO: Can include a function that checks if a valid label is passed after certain period.
  handleChange(event) {
    var value = event.target.value;
    this.setState(function() {
      return {
        label: value
      };
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.label);
  }

  render() {
    return (
      <form className="row" onSubmit={this.handleSubmit}>
        <label className="header" htmlFor="label">
          {this.props.label}
        </label>
        <input
          label="label"
          placeholder="github label"
          type="text"
          autoComplete="off"
          value={this.state.label}
          onChange={this.handleChange}
        />
        <button className="button" type="submit">
          Submit
        </button>
      </form>
    );
  }
}

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(label) {
    this.setState(function() {
      var newState = {};
      newState["label"] = label;
      return newState;
    });
  }

  render() {
    return (
      <div>
        <Labelinput label="" onSubmit={this.handleSubmit} />
        {this.state.label}
      </div>
    );
  }
}

module.exports = Search;
