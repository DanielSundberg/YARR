import * as React from 'react';
import RootStore from '../Model/RootStore';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

interface IAddFormState {
  feedUrl: string;
}

const Loader: React.SFC = () => {
  return (
      <div className="item">
          <div className="ui tiny active inline loader"/>
      </div>
  );
};

@inject("appState")
@observer
class AddForm extends React.Component<RootStore, IAddFormState> {

    constructor(props: RootStore) {
      super(props);
      this.state = {
        feedUrl: ''
      };
    }

    addFeedClicked(self: any) { // tslint:disable-line
      self.props.appState.add(self.state.feedUrl);
    }

    componentWillMount() {
      this.props.appState.addFeedSuccess = false;
      this.props.appState.addFeedMessage = '';
    }

    render() {
      let buttonClasses = this.state.feedUrl.length > 0 ? 
        "ui large primary floated fluid submit button" :
        "ui large primary floated fluid submit disabled button";
        let buttonContentOrLoader = this.props.appState.isAddingFeed ? 
          <Loader /> : (
          <div>Add</div>
        );

        let button = this.props.appState.addFeedSuccess ? (
        <Link to="/blogs">
          <button className={buttonClasses}>Close</button>
        </Link>
      ) : (
        <button className={buttonClasses} 
          // tslint:disable-next-line
          onClick={(ev: any) => this.addFeedClicked(this)}
        >
          {buttonContentOrLoader}
        </button>
      );
      let infoMessageIcon = this.props.appState.addFeedSuccess ? 
        "info icon" : "error icon";

      let infoMessageClasses = this.props.appState.addFeedSuccess ? 
        "ui info message" : "ui error message";
      let infoMessage = this.props.appState.addFeedMessage.length > 0  && (
        <div className={infoMessageClasses}>
          <i className={infoMessageIcon}></i>
          {this.props.appState.addFeedMessage}
        </div>
      );

      return (
        <div className="ui grid container">
          <div className="row"></div>
          <div className="row">

            <div className="sixteen wide column">
              <h1 className="ui header center">
                Add RSS Feed:
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="ui sixteen wide column">
              <form className="ui large form">
                <div className="field">
                  <div className="ui left input">
                    <input 
                      type="text" 
                      name="feed-url" 
                      placeholder="RSS Feed Url" 
                      // tslint:disable-next-line
                      onChange={(ev: any) => this.setState({ feedUrl: ev.target.value }) } 
                    />
                  </div>
                </div>
              </form>
              {infoMessage}
            </div>
          </div>
          <div className="row">
            <div className="ui sixteen wide column">
              {button}
            </div>
          </div>

        </div>);
    }
  }
  
export default AddForm;