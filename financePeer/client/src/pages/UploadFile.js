import React, { Component } from 'react'
import styled from 'styled-components'
import api from '../api'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

class UploadFile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            jsonFile: null,
            success: false,
        }
    }

    handleChange = event => {
        document.getElementById(event.target.id + "-info").innerHTML = "&emsp;" + event.target.files[0].name; 
        const fileUploaded = event.target.files[0];
        this.setState({
            jsonFile: fileUploaded
        });
    };

    submitFiles = (e) => {

        e.preventDefault();

        const { jsonFile } = this.state;
        let data = new FormData();

        data.append('jsonFile', jsonFile);

        api.uploadFile(data).then(result => {

            if (result.data.success === true) {
                alert("File Uploaded");
            } else {
                alert("Failed!");
            }

        })
        .catch(function(err) {
            alert("Failed. " + err);
            console.log(err)
        });
    };  


    render() {

        return (
            <Wrapper>
                <br/>
                <h3 className="text-center">Upload File</h3>
                <br/>
                <form>
                    <label className="btn btn-light" htmlFor="json-file">
                        <input type="file" id="json-file" name="jsonFile" accept=".json"
                         onChange={this.handleChange} style={{display:'none'}} />
                        &nbsp;Browse...&nbsp;
                    </label>
                    <span className='label label-info' id="json-file-info" >&emsp;No File Selected.</span>
                    
                    <br/><br/>
                    <div className="btn-group btn-block">
                        <button className="btn btn-success btn-lg" onClick={this.submitFiles} type="submit" >Upload!</button>
                    </div>
                </form>               
            </Wrapper>
        )
    }
}

export default UploadFile



