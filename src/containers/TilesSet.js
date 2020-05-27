import { connect } from 'react-redux';
import Tiles from '../components/Tiles';
import { openTile } from '../actions';

const mapStateToProps = state => ({ tiles: state });

const mapDispatchToProps = dispatch => {
  return {
    onTileClick: index => dispatch(openTile(index)),
  }
}

const TilesSet = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tiles);

export default TilesSet;
