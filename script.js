'use strict';

!(function () {
    class Planets {
        constructor() {
            this.tbody = document.querySelector('tbody');
            this.button = document.querySelector('button')
            this.init = function () {
                this._init();
            }
        }
        _init = () => {
            this._attachEvents()
        }
        _isString = (str) => {
            return typeof str === 'string';
        }
        _createElement = ({
                          tagName = 'div',
                          classes = [],
                          dataAttributes = {},
                          textContent = '',
                      }) => {
            if (!this._isString(tagName)) {
                console.warn('tagName createElement method of app must be string');
                let errorElement = document.createElement('div');
                errorElement.textContent =
                    'tagName createElement method of app must be string';
                return errorElement;
            }

            let element = document.createElement(tagName);

            if (this._isString(textContent)) {
                element.textContent = textContent;
            } else {
                console.warn('textContent createElement method of app must be string');
            }

            if (Array.isArray(classes)) {
                classes.forEach((className) => {
                    if (this._isString(className)) {
                        element.classList.add(className);
                    } else {
                        console.warn(
                            'classes element of app createElement method must be string'
                        );
                    }
                });
            }

            if (typeof dataAttributes === 'object' && dataAttributes) {
                Object.entries(dataAttributes).forEach((pair) => {
                    if (this._isString(pair[0]) || this._isString(pair[1])) {
                        element.setAttribute(pair[0], pair[1]);
                    } else {
                        console.warn(
                            'dataAttributes element of app createElement method must be string'
                        );
                    }
                });
            }
            return element;
        }

        _getPlanetsElements = (xhrArr) => {
            let tr = document.querySelector('.accordion-toggle');
            if (!tr) {
                this.planetsArr = xhrArr;
                let demo = 0;
                this.planetsArr.forEach(({
                                             climate,
                                             created,
                                             diameter,
                                             edited,
                                             gravity,
                                             name,
                                             orbital_period,
                                             population,
                                             rotation_period,
                                             surface_water,
                                             terrain,
                                             residents
                                         }) => {
                    demo++;
                    let residentsArr = residents;
                    let residentTr = this._createElement({tagName: 'tr'});
                    let residentTd = this._createElement({dataAttributes: {colspan: '6'}, tagName: 'td', classes: ['hiddenRow']});
                    let headBlock = this._createElement({classes: ['header'], textContent: 'Resodents'});
                    let residentBlock = this._createElement({dataAttributes: {id: `demo${demo}`}, classes: ['accordion-body', 'collapse']});

                    residentTr.append(residentTd);
                    residentBlock.append(headBlock)
                    residentTd.append(residentBlock);

                    residentsArr.forEach(resident => {
                        this._getData(resident).then(response => {
                            let residentTable = this._createElement({classes: ['resident-table'], tagName: 'table'});
                            let residentTBody = this._createElement({classes: ['resident-table'], tagName: 'tbody'});
                            let residentTHead = this._createElement({classes: ['resident-table'], tagName: 'thead'});
                            let headTr = this._createElement({tagName: 'tr'});
                            let name = this._createElement({classes: ['resident-td'], tagName: 'td', textContent: 'Name'});
                            let BY = this._createElement({classes: ['resident-td'], tagName: 'td', textContent: 'BY'});
                            let created = this._createElement({classes: ['resident-td'], tagName: 'td', textContent: 'created'});
                            let EC = this._createElement({classes: ['resident-td'], tagName: 'td', textContent: 'EC'});
                            let gender = this._createElement({classes: ['resident-td'], tagName: 'td', textContent: 'gender'});
                            let HC = this._createElement({classes: ['resident-td'], tagName: 'td', textContent: 'HC'});
                            let height = this._createElement({classes: ['resident-td'], tagName: 'td', textContent: 'height'});
                            let HW = this._createElement({classes: ['resident-td'], tagName: 'td', textContent: 'HW'});
                            let mass = this._createElement({classes: ['resident-td'], tagName: 'td', textContent: 'mass'});
                            let SC = this._createElement({classes: ['resident-td'], tagName: 'td', textContent: 'SC'});

                            headTr.append(name, BY, created, EC, gender, HC, height, HW, mass, SC);

                            let tableTr = this._createElement({tagName: 'tr'});
                            let residentName = this._createElement({classes: ['resident-td'], tagName: 'td', textContent: response.name});
                            let residentBY = this._createElement({classes: ['resident-td'],tagName: 'td', textContent: response.birth_year});
                            let residentCreated = this._createElement({classes: ['resident-td'],tagName: 'td', textContent: response.created});
                            let residentEC = this._createElement({classes: ['resident-td'],tagName: 'td', textContent: response.eye_color});
                            let residentGender = this._createElement({classes: ['resident-td'],tagName: 'td', textContent: response.gender});
                            let residentHC = this._createElement({classes: ['resident-td'],tagName: 'td', textContent: response.hair_color});
                            let residentHeight = this._createElement({classes: ['resident-td'],tagName: 'td', textContent: response.height});
                            let residentHW = this._createElement({classes: ['resident-td'],tagName: 'td', textContent: response.homeworld});
                            let residentMass = this._createElement({classes: ['resident-td'],tagName: 'td', textContent: response.mass});
                            let residentSC = this._createElement({classes: ['resident-td'],tagName: 'td', textContent: response.skin_color});

                            residentTHead.append(headTr);
                            tableTr.append(residentName, residentBY, residentCreated, residentEC, residentGender, residentHC, residentHeight, residentHW, residentMass, residentSC);
                            residentTBody.append(tableTr);
                            residentTable.append(residentTHead, residentTBody);
                            residentBlock.append(residentTable);

                        })
                    })
                    let planetTr = this._createElement({tagName: 'tr',dataAttributes: {'data-toggle':'collapse', 'data-target':`#demo${demo}`}, classes: ['accordion-toggle']});
                    let planetName = this._createElement({tagName: 'td', textContent: name})
                    let planetClimate = this._createElement({tagName: 'td', textContent: climate});
                    let planetCreated = this._createElement({tagName: 'td', textContent: created});
                    let planetDiameter = this._createElement({tagName: 'td', textContent: diameter});
                    let planetEdited = this._createElement({tagName: 'td', textContent: edited});
                    let planetGravity = this._createElement({tagName: 'td', textContent: gravity});
                    let orbitalPeriod = this._createElement({tagName: 'td', textContent: orbital_period});
                    let planetPopulation = this._createElement({tagName: 'td', textContent: population});
                    let rotationPeriod = this._createElement({tagName: 'td', textContent: rotation_period});
                    let surfaceWater = this._createElement({tagName: 'td', textContent: surface_water});
                    let planetTerrain = this._createElement({tagName: 'td', textContent: terrain});
                    let planetResidents = this._createElement({tagName: 'td', textContent: 'Residents'});
                    planetTr.append(planetName, planetClimate, planetCreated, planetEdited, planetGravity, orbitalPeriod, planetPopulation, planetDiameter, planetResidents, rotationPeriod, surfaceWater, planetTerrain);
                    this.tbody.append(planetTr, residentTr);
                })
            }
        }

        _followPromise = () => {
            this._getData('https://swapi.dev/api/planets').then(response => {
                let planetObj = response;
                this.planetsArr = planetObj.results;
                this._getPlanetsElements(this.planetsArr);
            })
        }

        _getData = (url) => {
            return new Promise((succeed, fail) => {
                let xhr = new XMLHttpRequest();

                xhr.open('GET', url)
                xhr.responseType = 'json';
                xhr.send()

                xhr.addEventListener('load', () => {
                    if (xhr.status !== 200) {
                        fail(new Error((`Request failed: ${xhr.statusText}`)))
                    }
                    if (xhr.response !== null) {
                        try {
                            succeed(xhr.response);
                        } catch (err) {
                            console.log(`Error load data: ${err}`)
                        }
                    }
                });
                xhr.addEventListener('error', () => fail (new Error('Network error')));
            })
        }
        _attachEvents = () => {
            this.button.addEventListener('click', this._followPromise);
        }
    }
    let planets = new Planets();
    planets.init();

})();
