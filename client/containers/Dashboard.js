import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MusicPlayer from '../components/music/MusicPlayer';
import Lights from '../components/lights/Lights';
import Todos from '../components/todo/Todo';
import Weather from '../components/weather/Weather';
import News from '../components/news/News';
import Reminders from '../components/reminders/reminders';
import SavedEvents from '../components/savedevents/SavedEvents';
import ResizableAndMovable from 'react-resizable-and-movable';
import FontAwesome from 'react-fontawesome';

const style = {
  textAlign: 'center',
  padding: '20px',
  border: 'solid 3px #fff',
  borderRadius: '5px',
  color: '#fff',
};

var components = [

  { title: '  Music Player',      component: <MusicPlayer />, x: 200,  y: 20,  w: 300, h: 730, res: 730, icon: <FontAwesome name='music' size='1x' /> },
  { title: '  Reminders',         component: <Reminders />,   x: 540,  y: 400, w: 300, h: 350, icon: <FontAwesome name='calendar' size='1x' /> },
  { title: '  Today\'s Weather',  component: <Weather />,     x: 540,  y: 20,  w: 300, h: 350, icon: <FontAwesome name='sun-o' size='1x' /> },
  { title: '  News',              component: <News />,        x: 880,  y: 20,  w: 300, h: 350, icon: <FontAwesome name='newspaper-o' size='1x' /> },
  { title: '  To-do List',        component: <Todos />,       x: 1220, y: 20,  w: 300, h: 350, icon: <FontAwesome name='tasks' size='1x' /> },
  { title: '  Saved Events',      component: <SavedEvents />, x: 1220, y: 400, w: 300, h: 350, icon: <FontAwesome name='sticky-note' size='1x' /> },
  { title: '  Home Automation',   component: <Lights />,      x: 880,  y: 400, w: 300, h: 350, icon: <FontAwesome name='lightbulb-o' size='1x' /> }

];

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      components: components
    }
  }

  sizeChange(i, dir, styleSize) {
    components[i].w = styleSize.width;
    components[i].h = styleSize.height;

    this.setState({
      components: components
    })
  }

  positionChange(i, e, ui) {
    components[i].x = ui.position.left;
    components[i].y = ui.position.top;

    this.setState({
      components: components
    })
  }

  render() {
    return (
      <div>
        {
        this.state.components.map((comp, i) => {
          if (comp.title === '  News') {
            return (
              <ResizableAndMovable
                x={comp.x}
                y={comp.y}
                width={ comp.w }
                height={ comp.h }
                style={ style }
                minWidth={ 300 }
                minHeight={ comp.res || 100 }
                moveGrid={ [20, 20] }
                resizeGrid={ [20, 20] }
                onResize={ this.sizeChange.bind(this, i) }
                onDrag= { this.positionChange.bind(this, i) }
                className="widget"
              >
                <div className="marvin-teal">
                  <h3>
                    <span>
                      { comp.icon }
                    </span>
                    { comp.title }
                  </h3>
                  <div>
                    <News
                      width={ comp.w }
                      height={ comp.h }
                    />
                  </div>
                </div>
              </ResizableAndMovable>
              )
          }
          return (
            <ResizableAndMovable
              x={comp.x}
              y={comp.y}
              width={ comp.w }
              height={ comp.h }
              style={ style }
              minWidth={ 300 }
              minHeight={ comp.res || 100 }
              moveGrid={ [20, 20] }
              resizeGrid={ [20, 20] }
              onResize={ this.sizeChange.bind(this, i) }
              onDrag= { this.positionChange.bind(this, i) }
              className="widget"
            >
              <div className="marvin-teal">
                <h3>
                  <span>
                    { comp.icon }
                  </span>
                  { comp.title }
                </h3>
                <div> { comp.component } </div>
              </div>
            </ResizableAndMovable>
            )
          })
        }
      </div>
    )
  }

}

function mapStateToProps (state) {
  return {
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
