import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Card,
  // CardTitle,
  CardBody,
  CardImg,
  // CardText,
  // CardHeader,
  Input,
  InputGroup,
  Button,
} from "reactstrap";
// import { Link } from "react-router-dom";

import { getGIFS } from "../../redux/action-creators/home";

const Home = ({ fetchGIFS, gifDetails }) => {
  const [, setShowGif] = useState(gifDetails);
  const [, setPickGif] = useState([]);

  const [showText, setShowText] = useState("");

  const showGifHandler = () => {
    const newGif = document.getElementById("gifData").value;
    fetchGIFS({ q: newGif });
    setShowGif(gifDetails);
  };

  const showTextHandler = () => {
    const newText = document.getElementById("textData").value;
    setShowText([...showText, newText]);
  };

  const wholeText = showText?.length ? showText : [];

  wholeText.map((ele) => window.console.log(ele));
  const gifUrls = gifDetails.map((a) => {
    return a.images.fixed_height.url;
  });

  const pickGifHandler = (i) => {
    const getPickGif = [i];
    setPickGif(getPickGif);
  };

  return (
    <Card>
      <Row className="align-items-center justify-content-center">
        <Col xs="6">
          <Card>
            <CardBody>
              <InputGroup>
                <Input
                  type="text"
                  // value={showText}
                  placeholder="write something here..."
                  onChange={(e) => e.target.value}
                  id="textData"
                />
                <Button color="primary" onClick={showTextHandler}>
                  Post
                </Button>
              </InputGroup>
              <ul>
                {wholeText.map((data) => {
                  return <li>{data}</li>;
                })}
              </ul>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <InputGroup>
                <Input
                  type="text"
                  placeholder="Search GIF here..."
                  onChange={(e) => e.target.value}
                  id="gifData"
                />
                <Button color="primary" outline onClick={showGifHandler}>
                  Search
                </Button>
              </InputGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="align-items-center justify-content-center">
        <Col xs="6">
          <Row className="list">
            {gifUrls.map((gif) => {
              return (
                <Col xs="2" key={gif.id} className="m-1">
                  <CardImg
                    src={`${gif}`}
                    alt="giphy."
                    onClick={pickGifHandler}
                  />
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

Home.propTypes = {
  fetchGIFS: PropTypes.func,
  gifDetails: PropTypes.instanceOf(Array),
};
Home.defaultProps = {
  fetchGIFS: () => {},
  gifDetails: [],
};

const mapStateToProps = ({ homeReducer }) => ({
  gifDetails: homeReducer?.gifDetails,
});

const mapDispatchToProps = {
  fetchGIFS: getGIFS,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
