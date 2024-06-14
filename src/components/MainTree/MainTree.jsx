import React, { Component } from 'react';
import FamilyTree from "@balkangraph/familytree.js";

export default class Tree extends Component {
    constructor(props) {
        super(props);
        this.divRef = React.createRef();
    }

    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        this.family = new FamilyTree(this.divRef.current, {
            nodes: this.props.nodes,
            mouseScrool: FamilyTree.none,
            roots: [3],
            nodeMenu: {
                edit: { text: 'Изменить' },
                details: { text: 'Детали' },
            },
            nodeTreeMenu: true,
            nodeBinding: {
                field_0: 'name',
                field_1: 'born',
                img_0: 'photo'
            },
            editForm: {
                titleBinding: "name",
                photoBinding: "photo",
                addMoreBtn: 'Добавить',
                addMore: 'Добавить ещё',
                addMoreFieldName: 'Имя элемента',
                generateElementsFromFields: false,
                elements: [
                    { type: 'textbox', label: 'ФИО', binding: 'name' },
                    { type: 'textbox', label: 'Email', binding: 'email' },
                    { type: 'textbox', label: 'Телефон', binding: 'phone' },
                    [
                        { type: 'date', label: 'Дата рождения', binding: 'born' },
                        { type: 'date', label: 'Дата смерти', binding: 'death' }
                    ],
                    [
                        { type: 'textbox', label: 'Страна', binding: 'country' },
                        { type: 'textbox', label: 'Город', binding: 'city' },
                    ],
                    { type: 'textbox', label: 'Биография', binding: 'bio' },
                ]
            },
        });

        FamilyTree.SEARCH_PLACEHOLDER = "Поиск";

        this.family.on('field', function (sender, args) {
            if (args.name === 'born' || args.name === 'death') {
                var date = new Date(args.value);
                args.value = date.toLocaleDateString();
            }
        });

        this.family.on('update', (sender, oldData, newData) => {
            console.log('Updated node data:', newData);
            const updatedNodes = this.family.nodes.map(node => node.id === newData.id ? newData : node);
            this.props.onSaveNodes(updatedNodes);
        });
    }

    render() {
        return (
            <div id="tree" ref={this.divRef}></div>
        );
    }
}
