import React from 'react';
import { Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import styles from '../style';
import { SelectorList, Selectable } from '../model/ActionableItem';

export default class OneSelector extends React.PureComponent<SelectorList, Selectable> {
    selected: Number;
    constructor(props) {
        super(props);
        this.state = { selected: "" };
        this.onPress = this.onPress.bind(this);
    }
    onPress(value: string) {
        this.setState({ selected: value });
        this.props.onItemAction(value, "select");
    }
    render() {
        return (
            <View style={{ marginBottom: 10,  borderBottomWidth: 1, borderColor: 'black'}}>
                <Text style={styles.selectorTitleText}>{this.props.title}</Text>
                <View style={{ flexDirection: "row", alignSelf: 'stretch' }}>
                    {
                        this.props.list.map((item, i) => {
                            return (<TouchableOpacity key={i} style={item.value == this.state.selected ? styles.selectorButtonSelected : styles.selectorButton} onPress={() => this.onPress(item.value)}>
                                <Text style={item.value == this.state.selected ? styles.selectorTextSelected : styles.selectorText}>{item.label}</Text>
                            </TouchableOpacity>)
                        })
                    }
                </View>
            </View>


        );
    }
}