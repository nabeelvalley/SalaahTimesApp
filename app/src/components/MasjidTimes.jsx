import React, { Component } from "react";
import NoticeContent from "./NoticeContent";
import { doesBookmarkExist, toggleBookmark } from "../helpers/cookieManager";
import { createEvent } from "../helpers/trackingHelper";

class MasjidTimes extends Component {
  state = {
    currentTab: "",
    tabChanged: false,
  };

  constructor(props) {
    super(props);
    this.state.currentTab = props.currentSalaah;
    this.state.isBookmark = doesBookmarkExist(props.details.id);
  }

  static getDerivedStateFromProps(props, state) {
    const currentTab = state.tabChanged
      ? state.currentTab
      : props.currentSalaah;
    return { ...state, currentTab, tabChanged: false };
  }

  toggleBookmark(id) {
    toggleBookmark(id);
    this.setState({ ...this.state, isBookmark: doesBookmarkExist(id) });
    this.props.handleBookmarkChange(id);
  }

  render() {
    const selectedTimes = this.props.details[this.state.currentTab];

    const pills = ["fajr", "zuhr", "asr", "maghrib", "esha"].map((salaah) =>
      this.props.details[salaah] &&
      (this.props.details[salaah].salaah ||
        this.props.details[salaah].athaan) ? (
        <div
          key={salaah}
          onClick={() =>
            this.setState({
              ...this.state,
              currentTab: salaah,
              tabChanged: true,
            })
          }
          className={
            "pill " + (this.state.currentTab === salaah ? "-selected" : "")
          }
        >
          {salaah}
        </div>
      ) : null
    );

    const renderInfo =
      this.props.details.info &&
      (this.props.details.info.notices ||
        ((this.props.details.info.zuhrSalaahSpecial ||
          this.props.details.info.zuhrAthaanSpecial) &&
          this.props.details.info.zuhrLabelSpecial));

    const info = renderInfo ? (
      <div
        key="info"
        onClick={() =>
          this.setState({
            ...this.state,
            currentTab: "info",
            tabChanged: true,
          })
        }
        className={
          "pill " + (this.state.currentTab === "info" ? "-selected" : "")
        }
      >
        i
      </div>
    ) : null;

    pills.push(info);

    let text;

    if (selectedTimes.athaan || selectedTimes.salaah)
      text = (
        <div>
          <div className="times">
            {selectedTimes.athaan ? (
              <div className="athaan">Athaan: {selectedTimes.athaan}</div>
            ) : null}
            {selectedTimes.salaah ? (
              <div className="salaah">Salaah: {selectedTimes.salaah}</div>
            ) : null}
          </div>
          {selectedTimes.jummahAthaan || selectedTimes.jummahKhutbah ? (
            <div className="jummah">
              <div className="title bold">Jummah</div>
              <div className="times">
                {selectedTimes.jummahAthaan ? (
                  <div className="athaan">
                    Athaan: {selectedTimes.jummahAthaan}
                  </div>
                ) : null}
                {selectedTimes.jummahKhutbah ? (
                  <div className="salaah">
                    Khutbah: {selectedTimes.jummahKhutbah}
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      );
    else if (renderInfo)
      text = <NoticeContent info={this.props.details.info} />;
    else
      text = (
        <div className="times">
          <div className="salaah">no times for {this.state.currentTab}</div>
        </div>
      );

    const location =
      this.props.details.address && this.props.details.suburb
        ? `${this.props.details.address}, ${this.props.details.suburb}`
        : this.props.details.address
        ? `${this.props.details.address}`
        : this.props.details.suburb
        ? `${this.props.details.suburb}`
        : "";

    const link = this.props.details.link;

    const id = this.props.details.id;

    return (
      <div className="MasjidTimes">
        <div className="name">
          {this.props.handleBookmarkChange ? (
            <div
              onClick={() =>
                createEvent("bookmarkClick", "bookmarkToggle", "click") ||
                this.toggleBookmark(id)
              }
              className={this.state.isBookmark ? "badge selected" : "badge"}
            ></div>
          ) : null}

          {this.props.details.name}
        </div>
        {link ? (
          <div className="address">
            <a href={link} target="_blank" rel="noopener noreferrer">
              {location}
            </a>
          </div>
        ) : (
          <div className="address">{location}</div>
        )}
        <div className="pills">{pills}</div>
        {text}
      </div>
    );
  }
}

export default MasjidTimes;
