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
            <th>Latitude</th>
            <th>Longitude</th>
          </tr>
        </thead>
        <tbody>
          {shelters.features.map(shelter =>
              <tr key={shelter.geometry.coordinates[1]}>
                  <td>{shelter.properties.adresse}</td>
                  <td>{shelter.properties.distriktsnavn}</td>
                  <td>{shelter.geometry.coordinates[0]}</td>
                  <td>{shelter.geometry.coordinates[1]}</td>
                 
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
        <p>This component demonstrates fetching data from the server.</p>
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
