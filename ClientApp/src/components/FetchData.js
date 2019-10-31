import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { shelters: [], loading: true };
  }

  componentDidMount() {
    this.populateShelterData();
  }

  static renderSheltersTable(shelters) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Address</th>
            <th>District</th>
            <th>Municipality</th>
            <th>Rooms</th>
          </tr>
        </thead>
        <tbody>
          {shelters.features.map(shelter =>
              <tr key={shelter.displayName}>
                  <td>{shelter.properties.adresse}</td>
                  <td>{shelter.properties.distriktsnavn}</td>
                  <td>{shelter.properties.kommune}</td>
                  <td>{shelter.properties.plasser}</td>

                 
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderSheltersTable(this.state.shelters);

    return (
      <div>
        <h1 id="tabelLabel" > Homes & Shelters </h1>
            <p> The table below shows relevant information about the public shelters in Norway. </p>
        {contents}
      </div>
    );
  }

  async populateShelterData() {
    const response = await fetch('shelter');
    const data = await response.json();
    this.setState({ shelters: data, loading: false });
  }
}
