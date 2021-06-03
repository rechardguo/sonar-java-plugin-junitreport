/*
 * Copyright (C) 2009-2019 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import React from "react";
// SonarComponents (referenced as sonar-components here, see the Webpack config)
// exposes React components exposed by SonarQube.
import { DeferredSpinner } from "sonar-components";
import {  findProjects } from "../../common/api";
import { AppJunitResult } from "./AppJunitResult"
const div1 = {
  width: "1000px",
  margin: "30px auto",
  //backgroundColor: "#44014C",  //驼峰法
  minHeight: "100px",
  boxSizing: "border-box"
};
export default class InstanceStatisticsApp extends React.PureComponent {
  state = {
    loading: true,
    result: []
  };

  componentDidMount() {
    Promise.all([
      findProjects()
    ]).then(([result]) => {
      this.setState({
        loading: false,
        result:result
      });
    });
  }

  render() {
    if (this.state.loading) {
      return <div className="page page-limited"><DeferredSpinner /></div>;
    }

    return (
      <div style={div1}>
        <h1>Junit Test Results</h1>
        {
          this.state.result.map((p) =>
                <AppJunitResult  pkey={p.key}  name={p.name}/>)
        }
      </div>
    );
  }


}
