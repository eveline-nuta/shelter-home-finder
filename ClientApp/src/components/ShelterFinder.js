import React, { Component } from 'react';

export class ShelterFinder extends Component {
    static displayName = ShelterFinder.name;

    constructor(props) {
        super(props);

        this.state = {
            currentLatLng: {
                lat: 0,
                lng: 0
            },
            shelters: [],
            closestShelter: ""
        };
        this.findShelter = this.findShelter.bind(this);
        this.populateShelterData();
    }

    getClosestShelterByGeoLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    console.log("my laptops location:");
                    console.log(position.coords.latitude);
                    console.log(position.coords.longitude);
                    this.findNearestShelter(position.coords.latitude, position.coords.longitude);
                }
            )
        }
    }
    //this.state.shelters.features[0].geometry.coordinates[0]
    PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
        lat1 = this.Deg2Rad(lat1);
        lat2 = this.Deg2Rad(lat2);
        lon1 = this.Deg2Rad(lon1);
        lon2 = this.Deg2Rad(lon2);
        var R = 6371; // km
        var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
        var y = (lat2 - lat1);
        var d = Math.sqrt(x * x + y * y) * R;
        return d;
    }

    findNearestShelter(latitude, longitude) {
        var minDif = 99999;
        var closest;

        for (var index = 0; index < this.state.shelters.features.length; ++index) {
            var dif = this.CalculateCrow(latitude, longitude, this.state.shelters.features[index].geometry.coordinates[1], this.state.shelters.features[index].geometry.coordinates[0]);
            if (dif < minDif) {
                closest = index;
                minDif = dif;
            }
        }

        console.log("closest shelter coords:");

        console.log(" COORD 0: ");
        console.log(this.state.shelters.features[closest].geometry.coordinates[0]);

        console.log(" COORD 1: ");
        console.log(this.state.shelters.features[closest].geometry.coordinates[1]);

        console.log(" address: ");

        console.log(this.state.shelters.features[closest].properties.adresse);

        this.setState({
            closestShelter: this.state.shelters.features[closest].properties.adresse
        })

    }

    // Convert Degress to Radians
    Deg2Rad(deg) {
        return deg * Math.PI / 180;
    }




    findShelter() {

        this.getClosestShelterByGeoLocation();
        //this.setState({

        //  });

    }


    //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
    CalculateCrow(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = this.ToRad(lat2 - lat1);
        var dLon = this.ToRad(lon2 - lon1);
        var lat1 = this.ToRad(lat1);
        var lat2 = this.ToRad(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }

    // Converts numeric degrees to radians
    ToRad(Value) {
        return Value * Math.PI / 180;
    }


    render() {
        return (
            <div>
                <h1>Your Home Finder</h1>

                <p>Click the button below to find your shelter</p>

                <button className="btn btn-primary" onClick={this.findShelter}>Find Shelter</button>

                <p aria-live="polite">The closest shelter to you is: <strong> {this.state.closestShelter} </strong></p>
            </div>
        );
    }

    async populateShelterData() {
        const response = await fetch('shelter');
        const data = await response.json();
        this.setState({ shelters: data });
    }


}
