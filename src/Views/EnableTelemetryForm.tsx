import * as React from 'react';
import RootStore from '../Model/RootStore';
import { inject, observer } from 'mobx-react';
import { TelemetryInfo } from './SettingsForm';
import { Redirect } from 'react-router';
import { register as registerDevice } from '../Model/DeviceUtils';

interface EnableTelemetryFormState {
    hasSelected: boolean;
}

// Change this if we want to show message one more time
const hasSeentelemetrySettingStr = "hasSeenTelemetryMessage1";

@inject("appState")
@inject("routing")
@inject("theme")
@inject("containerAppCallbacks")
@observer
class EnableTelemetryForm extends React.Component<RootStore, EnableTelemetryFormState> {
    constructor(props: RootStore) {
      super(props);
      this.state = {
        hasSelected: false,
      };
    }

    async clickedYes(self: any) { // tslint:disable-line
      localStorage.setItem(hasSeentelemetrySettingStr, "true");
      console.log(`Save settings, enable telemetry: ${true}, will auto generate device name.`); // tslint:disable-line
      const rsp = await registerDevice(
          this.props.containerAppCallbacks.url, 
          this.props.containerAppCallbacks.apiKey, 
          true
      );
      console.log("Response: ", rsp.errorMessage || "ok"); // tslint:disable-line
      self.setState({
          hasSelected: true
      });
    }

    clickedNo(self: any) { // tslint:disable-line
        localStorage.setItem(hasSeentelemetrySettingStr, "true");
        self.setState({
            hasSelected: true
        });
    }

    componentWillMount() {
        document.body.style.backgroundColor = this.props.theme.theme.listBackground;
    }

    render() {
      const telemetryEnabled: boolean = localStorage.getItem('enableTelemetry') === "true";
      const hasSeenTelemetryMessage = localStorage.getItem(hasSeentelemetrySettingStr) || "";
      if (hasSeenTelemetryMessage === "true" || telemetryEnabled) {
          return (<Redirect to="/blogs" />);
      } 
      return (
        <div className="ui grid middle center container">
          <div className="row" />
          <div className="row">
            <div className="two wide column" />
            <div className="twelve wide column">
                <h2 className="ui image header">
                    <div className="content" style={this.props.theme.settingsHeader()}>
                        AARR Usage Statistics
                    </div>
                </h2>
                <TelemetryInfo style={this.props.theme.infoMessage()}/>
                <form className="ui large form">
                    <div className="row">
                        <div 
                            className="ui fluid large primary submit button" 
                            style={this.props.theme.activeButton()}
                            // tslint:disable-next-line
                            onClick={(ev: any) => this.clickedYes(this)}
                        >
                            <i className="thumbs up icon" /> YES, I'm in!
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div 
                            className="ui fluid large primary submit button" 
                            style={this.props.theme.inactiveButton()}
                            // tslint:disable-next-line
                            onClick={(ev: any) => this.clickedNo(this)}
                        >
                            No, not right now
                        </div>
                    </div>
                </form>
            </div>
          </div>
        </div>);
    }
  }
  
export default EnableTelemetryForm;