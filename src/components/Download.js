import React from "react";
import axios from "axios";
import {Button, Form} from "react-bootstrap";

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

        //set the form data here
        //take id as key

        const formData = new FormData();
        formData.append(
            "id",
            this.state.fileId
        )

        await axios.post(URL_RETRIEVE,formData)
            .then(response => response.data)
            .then( (data) => {
                if(data != null){
                    console.log("Data : " +data);
                }
                else{
                    console.log("returned data is null.")
                }
            })


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