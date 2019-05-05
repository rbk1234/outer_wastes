/*
 *
  *     Note: A "coordinate" is the pair: [row, col]
  * */

(function($) {
    'use strict';

    var MAP_DEFAULTS = {
        startingCoord: [0,0],
        playerCoord: null,
        $modal: null
    };
    var currentMapId = 1;

    var Map = function (dbKey, config) {
        this._init(dbKey, config);
    };

    Map.prototype = {
        _init: function (dbKey, config) {
            this.dbKey = dbKey;
            this.id = currentMapId++;
            $.extend(true, this, MAP_DEFAULTS, Game.Maps.Database[dbKey], config);

            this._initTiles();
            this._moveToTile(this._tileForCoord(this.startingCoord));
        },

        _initTiles: function() {
            var r, c, numRows, numCols;
            this.tiles = [];

            for (r = 0, numRows = this.tileKeys.length; r < numRows; r++) {
                this.tiles[r] = [];

                for (c = 0, numCols = this.tileKeys[r].length; c < numCols; c++) {
                    var tileDbKey = this.legend[this.tileKeys[r][c]];
                    this.tiles[r][c] = new Game.UI.Tile(tileDbKey, { coordinate: [r,c] });
                }
            }
        },

        _moveToTile: function(tile) {
            tile.explored = true;
            this.playerCoord = tile.coordinate;
            this._refreshTiles();

            if (this.$modal) {
                this.$modal.foundation('close');
            }
        },

        _tileForCoord: function(coordinate) {
            return this.tiles[coordinate[0]][coordinate[1]];
        },

        loadHtml: function($modal) {
            this.$modal = $modal;
            var r, c, numRows, numCols;

            var $table = $('<table/>').addClass('map-table');
            for (r = 0, numRows = this.tiles.length; r < numRows; r++) {
                var $tr = $('<tr/>');
                for (c = 0, numCols = this.tiles[r].length; c < numCols; c++) {
                    var tile = this.tiles[r][c];
                    var $td = $('<td/>').data('tile', tile);
                    var $name = $('<span/>').addClass('tile-name');//.text(tile.name);
                    //var numLines = (tile.name.match(/\n/g) || []).length + 1;
                    //$name.addClass('num-lines-'+numLines).addClass(tile.color);
                    $td.append($name);

                    var $travelDesc = $('<span/>').addClass('travel-desc');
                    $td.append($travelDesc);

                    tile.$td = $td;
                    tile.$name = $name;
                    tile.$travelDesc = $travelDesc;

                    $tr.append($td);
                }
                $table.append($tr);
            }

            $modal.find('.map-name').html(this.name);
            $modal.find('.ascii-content').empty().append($table);
            this._initEventHandlers($table);
            this._refreshTiles();
        },

        _initEventHandlers: function($table) {
            var self = this;

            $table.off('click', 'td').on('click', 'td', function() {
                var tile = $(this).data('tile');
                if (tile.travelable) {
                    self._moveToTile(tile);
                }
            });
        },


        _refreshTiles: function() {
            var r, c, numRows, numCols, tile, isCurrentLocation;

            // Reset internal attributes
            for (r = 0, numRows = this.tiles.length; r < numRows; r++) {
                for (c = 0, numCols = this.tiles[r].length; c < numCols; c++) {
                    tile = this.tiles[r][c];
                    tile.visible = false;
                    tile.travelable = false;
                }
            }

            // Update internal attributes
            for (r = 0, numRows = this.tiles.length; r < numRows; r++) {
                for (c = 0, numCols = this.tiles[r].length; c < numCols; c++) {
                    tile = this.tiles[r][c];
                    isCurrentLocation = Game.Util.arraysEqual(tile.coordinate, this.playerCoord);

                    // Set tiles visible if they are explored, or adjacent to an explored tile
                    tile.visible = tile.explored;
                    this._adjacentTiles(r, c).forEach(function(adjacentTile) {
                        if (adjacentTile.explored) {
                            tile.visible = true;
                        }
                        if (isCurrentLocation) {
                            adjacentTile.travelable = true;
                        }
                    });
                }
            }

            // Update HTML
            if (!this.$modal) {
                return;
            }
            for (r = 0, numRows = this.tiles.length; r < numRows; r++) {
                for (c = 0, numCols = this.tiles[r].length; c < numCols; c++) {
                    tile = this.tiles[r][c];
                    isCurrentLocation = Game.Util.arraysEqual(tile.coordinate, this.playerCoord);

                    tile.$td.toggleClass('explored', tile.explored);
                    tile.$td.toggleClass('visible', tile.visible);
                    tile.$td.toggleClass('current-location', isCurrentLocation);
                    tile.$td.toggleClass('travelable', tile.travelable);

                    //var tileName = tile.explored ? tile.name : '???';
                    var tileName = tile.name;
                    var numLines = (tileName.match(/\n/g) || []).length + 1;
                    tile.$name.removeClass()
                        .addClass('tile-name')
                        .addClass('num-lines-'+numLines)
                        .addClass(tile.color)
                        .html(tileName);

                    var travelDesc = tile.travelable ? '' : 'Too Far';
                    if (isCurrentLocation) {
                        travelDesc = '';
                    }
                    tile.$travelDesc.html(travelDesc);
                }
            }



        },
        

        _adjacentTiles: function(r, c) {
            var adjacentTiles = [];

            if (this.tiles[r][c - 1]) {
                adjacentTiles.push(this.tiles[r][c - 1]);
            }
            if (this.tiles[r][c + 1]) {
                adjacentTiles.push(this.tiles[r][c + 1]);
            }
            if (this.tiles[r - 1] && this.tiles[r - 1][c]) {
                adjacentTiles.push(this.tiles[r - 1][c])
            }
            if (this.tiles[r + 1] && this.tiles[r + 1][c]) {
                adjacentTiles.push(this.tiles[r + 1][c])
            }
            return adjacentTiles;
        }

    };

    Game.namespace('UI').Map = Map;


    var TILE_DEFAULTS = {
        explored: false,
        visible: false,
        travelable: false
    };
    var currentTileId = 1;

    var Tile = function (dbKey, config) {
        this._init(dbKey, config);
    };
    Tile.prototype = {
        _init: function (dbKey, config) {
            this.dbKey = dbKey;
            this.id = currentTileId++;
            $.extend(true, this, TILE_DEFAULTS, Game.Maps.Tiles[dbKey], config);
        }
    };

    Game.namespace('UI').Tile = Tile;


}(jQuery));
