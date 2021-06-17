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
import { findProjectJunitResult } from "../../common/api";
// SonarComponents (referenced as sonar-components here, see the Webpack config)
// exposes React components exposed by SonarQube.
import { DeferredSpinner } from "sonar-components";
import {  findProjects } from "../../common/api";
import { AppJunitResult } from "./AppJunitResult"
const div2 = {
  width: "1000px",
  margin: "30px auto",
  minHeight: "100px",
  boxSizing: "border-box"
};
export default class JunitStaticstisInTable extends React.PureComponent {
  state = {
    loading: true,
    result: []
  };

  componentDidMount() {
    let all=[];
    this.props.projects.forEach(p=>{
      all.push( findProjectJunitResult(p.key))
    });

    Promise.all(all).then(result => {
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
    let result=[];

    this.state.result.forEach(p=>{
      let statics={};
      statics.project=p.name;
      statics.total=p.data[p.data.length-1].data.tests;
      statics.fail=p.data[p.data.length-1].data.test_failures;
      result.push(statics)
    });

    let detail=result.map((node) =><div>{node.project} ===> total:{node.total}, fail:{node.fail}</div>)
    let allCases=0;
    let allFailCases=0;
    result.forEach(node=>{
      allCases=allCases+Number(node.total);
      allFailCases=allFailCases+Number(node.fail);
    })
    let summary=<div><b>summary ===>  total:{allCases}, fail:{allFailCases}</b></div>
    return (
        <div style={div2}>{detail}{summary}</div>

    );
  }


}
