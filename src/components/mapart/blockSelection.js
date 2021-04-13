import React, { Component } from "react";

import defaultPresets from "./defaultPresets.json";
import coloursJSON from "./coloursJSON.json";

import "./blockSelection.css";

class BlockSelection extends Component {
  cssRGB(RGBArray) {
    // RGB array to css compatible string
    return "rgb(" + RGBArray.join(", ") + ")";
  }

  render() {
    const {
      getLocaleString,
      onChangeColourSetBlock,
      optionValue_version,
      optionValue_modeNBTOrMapdat,
      optionValue_staircasing,
      optionValue_unobtainable,
      selectedBlocks,
      customPresets,
      selectedPresetName,
      onPresetChange,
      onDeletePreset,
      onSavePreset,
      onSharePreset,
      onGetPDNPaletteClicked,
    } = this.props;
    return (
      <div className="blockSelection section">
        <div className="blockSelectionHeader">
          <h2 id="blockselectiontitle">
            {getLocaleString("BLOCKSELECTIONTITLE")}
          </h2>

          <b>{getLocaleString("PRESETS") + ": "}</b>
          <select
            id="presets"
            value={selectedPresetName}
            onChange={onPresetChange}
          >
            {defaultPresets.map((preset) => (
              <option value={preset["name"]} key={preset["localeKey"]}>
                {getLocaleString(preset["localeKey"])}
              </option>
            ))}
            {customPresets.map((preset) => (
              <option value={preset["name"]} key={preset["name"]}>
                {preset["name"]}
              </option>
            ))}
          </select>
          <button type="button" onClick={onDeletePreset}>
            {getLocaleString("PRESETS-DELETE")}
          </button>
          <button type="button" onClick={onSavePreset}>
            {getLocaleString("PRESETS-SAVE")}
          </button>
          <button
            type="button"
            onClick={onSharePreset}
            data-tooltip
            data-title={getLocaleString("PRESETS-TT-SHARE")}
          >
            {getLocaleString("PRESETS-SHARE")}
          </button>
          <button
            type="button"
            onClick={onGetPDNPaletteClicked}
            data-tooltip
            data-title={getLocaleString("DOWNLOAD-TT-PDN")}
          >
            {getLocaleString("DOWNLOAD-PDN")}
          </button>
        </div>
        <div className="blockSelectionBlocks">
          {Object.entries(coloursJSON).map(([colourSetId, colourSet]) => (
            <div key={colourSetId} className="colourSet">
              <div
                className="colourSetBox"
                style={{
                  background:
                    optionValue_staircasing === "off"
                      ? this.cssRGB(colourSet["tonesRGB"]["normal"])
                      : optionValue_modeNBTOrMapdat === "NBT" ||
                        !optionValue_unobtainable
                      ? "linear-gradient(" +
                        this.cssRGB(colourSet["tonesRGB"]["dark"]) +
                        " 33%, " +
                        this.cssRGB(colourSet["tonesRGB"]["normal"]) +
                        " 33%, " +
                        this.cssRGB(colourSet["tonesRGB"]["normal"]) +
                        " 66%, " +
                        this.cssRGB(colourSet["tonesRGB"]["light"]) +
                        " 66%)"
                      : "linear-gradient(" +
                        this.cssRGB(colourSet["tonesRGB"]["unobtainable"]) +
                        " 25%, " +
                        this.cssRGB(colourSet["tonesRGB"]["dark"]) +
                        " 25%, " +
                        this.cssRGB(colourSet["tonesRGB"]["dark"]) +
                        " 50%, " +
                        this.cssRGB(colourSet["tonesRGB"]["normal"]) +
                        " 50%, " +
                        this.cssRGB(colourSet["tonesRGB"]["normal"]) +
                        " 75%, " +
                        this.cssRGB(colourSet["tonesRGB"]["light"]) +
                        " 75%)",
                }}
              ></div>
              <label>
                <img
                  src="./images/barrier.png"
                  alt={getLocaleString("NONE")}
                  className={
                    selectedBlocks[colourSetId] === "-1"
                      ? "blockImage blockImage_selected"
                      : "blockImage"
                  }
                  data-tooltip
                  data-title={getLocaleString("NONE")}
                  onClick={() => onChangeColourSetBlock(colourSetId, "-1")}
                ></img>
              </label>
              {Object.entries(colourSet["blocks"])
                .filter(([, block]) =>
                  Object.keys(block["validVersions"]).includes(optionValue_version)
                )
                .map(([blockId, block]) => (
                  <label key={blockId}>
                    <img
                      src="./images/null.png"
                      alt={block["displayName"]}
                      className={
                        selectedBlocks[colourSetId] === blockId
                          ? "blockImage blockImage_selected"
                          : "blockImage"
                      }
                      data-tooltip
                      data-title={block["displayName"]}
                      style={{
                        backgroundImage: 'url("./images/textures.png")',
                        backgroundPositionX: "-" + blockId + "00%",
                        backgroundPositionY: "-" + colourSetId + "00%",
                      }}
                      onClick={() =>
                        onChangeColourSetBlock(colourSetId, blockId)
                      }
                    ></img>
                  </label>
                ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default BlockSelection;
