# react-native-show-case-view
Highlight the best bits of your app, describe the functionalities to your users quickly (iOS/Android).

<br/>
<img src="Example/demo.gif" width="280" height="500"/>

##Installation:
`Will publish as soon as it is more stable`

##Usage:


```javascript
export default class ShowcaseTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            components: []
        };
    }

    componentDidMount() {
        setTimeout(()=> {
            var promises = [];

            for (var ref in this.refs) {
                if (this.refs.hasOwnProperty(ref)) {
                    promises.push(new Promise((resolve)=> {
                        let desc = this.refs[ref].props.description;
                        this.refs[ref].measure((ox, oy, width, height, px, py)=> {
                            //console.log();
                            //console.log(ox, oy, width, height, px, py);
                            resolve({
                                x          : ox,
                                y          : oy,
                                width      : width,
                                height     : height,
                                px         : px,
                                py         : py,
                                description: desc
                            });
                        });
                    }));
                }
            }

            Promise.all(promises)
                .then((res)=> {
                    console.log(res);
                    this.setState({components: res});
                })
                .catch(err=>console.log(err));
        }, 0)
    }

    render() {
        return (
            <View style={styles.container}>
                <Showcase components={this.state.components || []}/>
                <View style={styles.description}>
                    <View style={styles.flat} ref="text1" description="Text 1 is used to display text 1">
                        <Text style={styles.label}>Hello There, text 1</Text>
                    </View>
                    <View style={styles.flat} ref="text2" description="Text 2 is used to display text 2">
                        <Text style={styles.label}>Hello There, text 2</Text>
                    </View>
                    <View style={styles.flat} ref="text3" description="Text 3 is used to display text 3">
                        <Text style={styles.label}>Hello There, text 3</Text>
                    </View>
                    <View style={styles.flat} ref="text4" description="Text 4 is used to display text 4">
                        <Text style={styles.label}>Hello There, text 4</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} ref="button" description="Button is used to trigger a bomb">
                    <View >
                        <Text style={styles.click}>Hey There, Button</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
```

`NB: PRs are welcome`
