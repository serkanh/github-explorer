var React = require("react");
var api = require("../utils/api");

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

function RepoGrid(props) {
  return (
    <ul className="popular-list">
      {props.repos.map(function(repo, index) {
        return (
          <li key={repo.name + index} className="popular-item">
            <div className="popular-rank">#{index + 1}</div>
            <ul className="space-list-items">
              <li>
                <a href={repo.owner_html_url}>
                  <img className="avatar" src={repo.owner_avatar_url} />
                </a>
              </li>
              <li>
                <a href={repo.html_url}>{repo.name}</a>
              </li>

              <li>{repo.github_stars} stars</li>
            </ul>
          </li>
        );
      })}
    </ul>
  );
}

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "s3",
      repos: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.handleSubmit(this.state.label);
  }

  handleSubmit(label) {
    this.setState(function() {
      return {
        label: label,
        repos: []
      };
    });

    api.fetchReposWithLabels(label).then(
      function(repos) {
        console.log(repos);
        this.setState(function() {
          return {
            repos: repos
          };
        });
      }.bind(this)
    );
  }

  render() {
    return (
      <div>
        <Labelinput label="" onSubmit={this.handleSubmit} />
        <div className="label-header">
          <h3>{this.state.label}</h3>
        </div>

        {!this.state.repos ? (
          <p>LOADING!</p>
        ) : (
          <RepoGrid repos={this.state.repos} />
        )}
      </div>
    );
  }
}

module.exports = Search;
