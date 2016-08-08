import React, {PropTypes} from 'react';
let Lightbox = require('react-image-lightbox');
 
let images = [
];  

let LightboxView =  React.createClass({
    getInitialState: function() {
        let x = this.props.pictures;
        for(let i=0; i<this.props.pictures.length; i++)
        {
            images.push(this.props.pictures[i].src);
        }
          
        return {
            index: 0,
            isOpen: false
        };
    },
    openLightbox: function() {
        this.setState({ isOpen: true });
    },
    closeLightbox: function() {
        this.setState({ isOpen: false });
    },
    moveNext: function() {
        this.setState({ index: (this.state.index + 1) % images.length });
    },
    movePrev: function() {
        this.setState({ index: (this.state.index + images.length - 1) % images.length });
    },
    render: function() {
    
        let lightbox = '';
        if (this.state.isOpen) {
            lightbox = (
                <Lightbox
                    mainSrc={images[this.state.index]}
                    nextSrc={images[(this.state.index + 1) % images.length]}
                    prevSrc={images[(this.state.index + images.length - 1) % images.length]}

                    onCloseRequest={this.closeLightbox}
                    onMovePrevRequest={this.movePrev}
                    onMoveNextRequest={this.moveNext}
                />
            );
        }

        return (
            <div>
                <button type="button" className="btn btn-primary btn-sm" onClick={this.openLightbox}>Open Images in Lightbox</button>
                {lightbox}
            </div>
        );
    }

});

LightboxView.propTypes = {
  pictures: PropTypes.array.isRequired
};

export default LightboxView;