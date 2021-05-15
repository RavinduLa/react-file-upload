import React from "react";
import {Button, Form} from "react-bootstrap";
import axios from "axios";


class Upload extends React.Component{
    constructor(props) {
        super(props);

        this.state = this.initialState;

        this.fileChange = this.fileChange.bind(this);
        this.senderNameChange = this.senderNameChange.bind(this);
        this.submitForm = this.submitForm.bind(this);

    }

    initialState={
        senderName:'',
        file:null
    }

    componentDidMount() {
    }

    fileChange = async (event)=> {
        event.preventDefault();
       /* let file = event.target.files[0];
        const fileData = new FormData();
        fileData.append('pdfFile',file);
        this.setState({file:fileData});*/

        await this.setState({file:event.target.files[0]})
    }

    senderNameChange = (event)  => {
        event.preventDefault();
        this.setState({senderName:event.target.value});
    }

        submitForm = async (event) => {
        event.preventDefault();

        console.log("Running submit form");

        const formData = new FormData();
        formData.append(
            "file",
            this.state.file)

        console.log(this.state.file)

        const fileRequest ={
            file:this.state.file,
            uploaderName:this.state.senderName
        }

        if(formData == null){
            console.log("form data is null here")
        }

        await axios.post("http://localhost:8080/upload2",formData)
            .then(response => response.data)
            .then((data) => {
                if(data != null){
                    alert("File uploaded successfully");
                }
                else{
                    alert("Error in uploading");
                }
            }).catch(error => {
                console.log(error);
        })

    }


    render() {
        return (
            <div>
                <h1>File Upload</h1>

                <Form onSubmit={this.submitForm.bind(this)}  >
                    {/*<Form.Group controlId="formUploadFile">
                        <Form.Label>Select file</Form.Label>
                        <Form.Control
                            type={'file'}
                            name={'file'}
                            id={'file'}
                            onChange={this.fileChange.bind(this)}
                        >

                        </Form.Control>
                    </Form.Group>*/}


                    <Form.Group>
                        <Form.File
                            className="position-relative"
                            required
                            name="file"
                            label="File"
                            onChange={this.fileChange.bind(this)}
                            id="validationFormik107"
                        />
                    </Form.Group>


                    <Form.Group controlId={"uploaderName"}>
                        <Form.Label>Sender name</Form.Label>
                        <Form.Control
                            type={'text'}
                            name={'sender'}
                            id={'sender'}
                            onChange={this.senderNameChange.bind(this)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Button type={'submit'} className={'btn btn-primary'}>Upload</Button>
                </Form>
            </div>
        );
    }

}

export default Upload;