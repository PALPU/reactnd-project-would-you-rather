import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";
import FaCheck from "react-icons/lib/fa/check";
import { handleSavePollAnswer } from "../actions/shared";
import PageNotFound from "./PageNotFound";

//pollDetails is the component which renders all the details of a particular poll
class PollDetails extends Component {
  state = {
    selectedOption: "",
  };

  selectRadio = (e) => {
    this.setState({
      selectedOption: e.target.value,
    });
  };
  submitAnswer = (e) => {
    e.preventDefault();

    const { savePollAnswer } = this.props;
    const answer = this.state.selectedOption;
    savePollAnswer(answer);
  };

  render() {
    const {
      poll,
      authorAvatar,
      timestamp,
      author,
      optionOne,
      optionTwo,
      answered,
      isOneAnswered,
      isTwoAnswered,
    } = this.props;
    const optionOneVotes = poll !== null ? poll.optionOne.votes.length : null;
    const optionTwoVotes = poll !== null ? poll.optionTwo.votes.length : null;
    const optionOnePercentage =
      poll !== null
        ? ((optionOneVotes / (optionOneVotes + optionTwoVotes)) * 100).toFixed(
            2
          )
        : 0;
    const optionTwoPercentage =
      poll !== null
        ? ((optionTwoVotes / (optionOneVotes + optionTwoVotes)) * 100).toFixed(
            2
          )
        : 0;
    return poll !== null ? (
      <Fragment>
        <div className="form margin poll-details-form">
          <div className="form-header">
            <p className="form-title">Would You Rather</p>
          </div>
          {answered ? (
            <div className="form-body no-bottom-round">
              <ul className="no-padding no-margin">
                <li className="fix-answered-li full-width">
                  <span className={isOneAnswered ? "answered" : ""}>
                    {optionOne}
                  </span>
                  {isOneAnswered ? (
                    <FaCheck className="padding-left answered" />
                  ) : null}
                  <span className="vote-result">{`${optionOneVotes} vote(s) | ${optionOnePercentage}%`}</span>
                </li>
                <li className="no-padding fix-answered-li full-width">
                  <div className="or-seperator">
                    <hr />
                    <p className="inline-p">OR</p>
                    <hr />
                  </div>
                </li>
                <li className="padding-bottom fix-answered-li full-width">
                  <span className={isTwoAnswered ? "answered" : ""}>
                    {optionTwo}
                  </span>
                  {isTwoAnswered ? (
                    <FaCheck className="padding-left answered" />
                  ) : null}
                  <span className="vote-result">{`${optionTwoVotes} vote(s) | ${optionTwoPercentage}%`}</span>
                </li>
              </ul>
            </div>
          ) : (
            <form
              onSubmit={this.submitAnswer}
              className="form-body no-bottom-round"
            >
              <div className="radio_container-div">
                <label className="radio_container">
                  <span className="input_radio">{optionOne}</span>
                  <input
                    className="hide"
                    type="radio"
                    name="select_option"
                    value="optionOne"
                    onClick={this.selectRadio}
                  />
                  <span className="checkmark"></span>
                </label>

                <label className="radio_container">
                  <span className="input_radio">{optionTwo}</span>
                  <input
                    className="hide"
                    type="radio"
                    name="select_option"
                    value="optionTwo"
                    onClick={this.selectRadio}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
              <button className="button">Submit</button>
            </form>
          )}
          <div className="user-details">
            <ul className="user-detail-ul nav nav-account block">
              <li className="user-info-li inline-block">
                <img
                  src={authorAvatar}
                  alt={`Avatar of ${author}`}
                  className="scale-down-mid profile-pic vertical-align"
                />
                <span className="padding-left">{author}</span>
              </li>
              <li className="time-stamp user-info-li block">{timestamp}</li>
            </ul>
          </div>
        </div>
      </Fragment>
    ) : (
      <PageNotFound />
    );
  }
}

function mapStateToProps({ authedUser, polls, users }, props) {
  const { question_id } = props.match.params;
  const poll = polls[question_id];
  if (poll === null || poll === undefined) {
    return { poll: null };
  }
  const authorAvatar = users[poll.author].avatarURL;
  const author = users[poll.author].id;
  const timestamp = formatDate(poll.timestamp);
  const optionOne = poll.optionOne.text;
  const optionTwo = poll.optionTwo.text;
  const isOneAnswered = poll.optionOne.votes.includes(authedUser);
  const isTwoAnswered = poll.optionTwo.votes.includes(authedUser);
  const answered = isOneAnswered || isTwoAnswered;

  return {
    authorAvatar,
    author,
    timestamp,
    optionOne,
    optionTwo,
    answered,
    isOneAnswered,
    isTwoAnswered,
    poll,
    users,
    polls,
    authedUser,
    question_id,
  };
}

function mapDispatchToProps(dispatch, props) {
  const { question_id } = props.match.params;
  return {
    savePollAnswer: (answer) => {
      dispatch(handleSavePollAnswer(question_id, answer));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PollDetails);
