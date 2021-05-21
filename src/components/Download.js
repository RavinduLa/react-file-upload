import React from "react";
import axios from "axios";
import {Button, Form} from "react-bootstrap";
import FileDownload from "js-file-download";

class Download extends React.Component{

    constructor(props) {
        super(props);

        this.state = this.initialState;

        this.changeFileId = this.changeFileId.bind(this);
        this.retrieveFile =this.retrieveFile.bind(this);
    }

    initialState ={
        fileId:''
    }

    componentDidMount() {
    }

    changeFileId = (event) => {
        event.preventDefault();

        this.setState({fileId:event.target.value})
    }

    retrieveFile = async (event) => {
        event.preventDefault();

        const URL_RETRIEVE = "http://localhost:8080/retrieve";
        const URL_HTTP_RETREIVE = "http://localhost:8080/httpFileRetreive";

        //set the form data here
        //take id as key

        const formData = new FormData();
        formData.append(
            "id",
            this.state.fileId
        )

        await axios.post(URL_HTTP_RETREIVE,formData,{responseType:'blob'})
            .then( (response) => {
                console.log("Data: "+response.data);

                let headerline =  response.request.getResponseHeader('Content-Disposition') //get content disposition
                let startFileNameIndex = headerline.indexOf('=')+1;  //set start at '=' sign of 'filename=' phrase
                let endFileNameIndex = headerline.lastIndexOf('"');  //set the last index at the end of the content disposition
                let filename =  headerline.substring(startFileNameIndex,endFileNameIndex);  //get the substring filename
                console.log("Content disposition: "+ headerline);


                FileDownload(response.data,filename+".pdf");
            });


    }

    render() {
        return (
            <div>

                <Form onSubmit={this.retrieveFile.bind(this)}>
                    <Form.Group>
                        <Form.Label>Enter File Id</Form.Label>
                        <Form.Control
                        type={'text'}
                        name={'fileId'}
                        onChange={this.changeFileId.bind(this)}>

                        </Form.Control>
                    </Form.Group>

                    <Button type={'submit'} className={'btn btn-primary'}>Download</Button>
                </Form>

            </div>
        );
    }

}

export default Download;