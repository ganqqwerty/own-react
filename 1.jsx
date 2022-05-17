function createTextElement(text) {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            node_value: text,
            children: [],
        },
    };
}

const React = {
    //children is using ...rest so if you just say children, it will be always an array
    createElement: (type, props, ...children) => {
        return {
            type,
            props: {
                ...props,
                children: children.map((child) =>
                    typeof child === 'object' ? child : createTextElement(child)
                ),
            },
        };
    },
};


function render(element, container) {
    const dom =
        element.type === "TEXT_ELEMENT"
            ? document.createTextNode(element.props.node_value)
            : document.createElement(element.type)

    const isProperty = key => key !== "children"
    Object.keys(element.props)
        .filter(isProperty)
        .forEach(name => {
            dom[name] = element.props[name]
        })

    element.props.children.forEach(child =>
        render(child, dom)
    )

    container.appendChild(dom)
}

const ReactDOM = {
    render
};

/** @jsx React.createElement */
const element = (
    <div id="foo">
        <a style="background-color: blue">bar</a>
        <b />
    </div>
)


const container = document.getElementById('app');
console.log(element)
ReactDOM.render(element, container);

