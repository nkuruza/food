import React from 'react';
import { Text, View, TouchableOpacity, Image, TextInput } from 'react-native';


export default class NumberInput extends React.Component<any, any>{
    constructor(props){
        super(props);
        this.state = {count: null}
    }
    onChanged = (text) => {
        this.setState({
            count: text.replace(/[^0-9]/g, ''),
        });
    }
    render() {
        return (
            <TextInput value={this.state.count} {...this.props} onChangeText={this.onChanged} />
        );
    }
}