# react-native-vexflow-canvas 🎇

This a simple package that enables using VexFlow in React Native. Below, you can find an example on how to use ``VexCanvas``. If you like, you can also read the small documentation which is also down below.

## Example usage: 

```js
import VexCanvas from "react-native-vexflow-canvas";

// some other imports... 

const MyVexView = () => {
    const draw = (ref) => {
        const context = ref.getContext(); // get the context from the canvas.
        context.clear(); // To have a clean canvas in every render.

        /*
            Your VexFlow Code After Here
        */

        const stave = new Stave(0, 0, 250, 250);

        stave.setContext(context);
        stave.draw();
    };

    return (<View>
                <VexCanvas
                    draw={draw} // this prop allows access to Canvas, and thus the context. Pass a function to it.
                ></VexCanvas>
            </View>
    );
};

```

## Documentation 📑

The package provides two main utilities: ``VexCanvas`` and ``RNVexFlowSVGContext``.

### VexCanvas

| Prop | Descripton |
|----|----|
| width | width  of the canvas.|
| height | height  of the canvas.|
| draw | callback function which takes a reference to canvas. you can use it to access the context. |


| Method | Descripton |
|----|----|
| getContext() | returns the context (```RNVexFlowSVGContext```).|

### RNVexFlowSVGContext

This is a class that VexFlow will use to create a SVG element (react-native-svg). 

| Method | Descripton |
|----|----|
| render() | returns a React element that is filled with correct SVG elements (like text, path etc.) |

There are other methods of ```RNVexFlowSVGContext``` that are only used by VexFlow to fill the canvas. You can check them out in the source code.





 


