var inputs = [];
function getNumberOfNodes() {
    if (inputs.length > 0) {
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].parentNode.removeChild(inputs[i]);
        }
        inputs = [];
        svg.selectAll("*").remove();
    }
    svg = d3.select("#dataviz_area");
    var width = svg.attr("width");
    var height = svg.attr("height");
    paddingNodes = 100;
    padding = 0;
    paddingInput = height / (nn.inputs * 1 + 1);
    paddingHidden = height / (nn.hiddens * 1 + 1);
    paddingOutput = height / (nn.outputs * 1 + 1);
    paddingLayers = width / (nn.layers * 1 + 3);
    updateLines();

    for (var i = 0; i < nn.inputs; i++) {

        svg.append("circle")
            .attr("cx", paddingLayers).attr("cy", paddingInput + paddingInput * i).attr("r", 5).style("fill", "blue");
        var container = document.getElementById("inputs");
        var input = document.createElement("INPUT");
        input.type = "text";
        input.className = "css-class-name";
        input.style.top = paddingInput + paddingInput * i + "px";
        input.style.left = paddingLayers - 65 + "px";
        input.style.position = "absolute";
        input.size = 4;
        input.id = "input" + i.toString();
        input.value = Math.random();
        container.appendChild(input);
        inputs.push(input);
    }
    for (var i = 0; i < nn.hiddenLayers.length; i++) {
        for (var j = 0; j < nn.hiddenLayers[i].nodes; j++) {
            svg.append("circle")
                .attr("cx", paddingLayers * 2 + paddingLayers * i).attr("cy", paddingHidden + paddingHidden * j).attr("r", 5).style("fill", "blue");
        }
    }
    for (var i = 0; i < nn.outputs; i++) {
        svg.append("circle")
            .attr("cx", paddingLayers * (nn.layers * 1 + 2)).attr("cy", paddingOutput + paddingOutput * i).attr("r", 5).style("fill", "blue");
        var container = document.getElementById("inputs");
        var input = document.createElement("INPUT");
        input.type = "text";
        input.className = "css-class-name";
        input.style.top = paddingOutput + paddingOutput * i + "px";
        input.style.left = 20 + paddingLayers * (nn.layers * 1 + 2) + "px";
        input.style.position = "absolute";
        input.size = 4;
        input.id = "output" + i.toString();
        input.value = Math.random();
        container.appendChild(input);
        inputs.push(input);
    }
}

function updateLines() {
    let opacity = 4;
    //input lines
    for (var i = 0; i < nn.inputs; i++) {
        for (var j = 0; j < nn.inputLayer.nextLayerNodes; j++) {
            if (nn.inputLayer.weights[i][j] > 0) {
                svg.append("line").attr("x1", paddingLayers).attr("y1", paddingInput + paddingInput * i).attr("x2", paddingLayers * 2).attr("y2", paddingHidden + paddingHidden * j)
                    .attr("stroke-width", 1).attr("stroke", "black").style("opacity", nn.inputLayer.weights[i][j]/opacity);
            } else {
                svg.append("line").attr("x1", paddingLayers).attr("y1", paddingInput + paddingInput * i).attr("x2", paddingLayers * 2).attr("y2", paddingHidden + paddingHidden * j)
                    .attr("stroke-width", 1).attr("stroke", "red").style("opacity", -nn.inputLayer.weights[i][j]/opacity);

            }
        }
    }

    //hidden lines
    for (var i = 0; i < nn.hiddenLayers.length - 1; i++) {
        for (var j = 0; j < nn.hiddenLayers[i].nodes; j++) {
            for (var y = 0; y < nn.hiddenLayers[i].nextLayerNodes; y++) {
                if (nn.hiddenLayers[i].weights[j][y] > 0) {
                    svg.append("line").attr("x1", paddingLayers * 2 + paddingLayers * i).attr("y1", paddingHidden + paddingHidden * j).attr("x2", paddingLayers * 3 + paddingLayers * i).attr("y2", paddingHidden + paddingHidden * y)
                        .attr("stroke-width", 1).attr("stroke", "black").style("opacity", nn.hiddenLayers[i].weights[j][y]/opacity);
                } else {
                    svg.append("line").attr("x1", paddingLayers * 2 + paddingLayers * i).attr("y1", paddingHidden + paddingHidden * j).attr("x2", paddingLayers * 3 + paddingLayers * i).attr("y2", paddingHidden + paddingHidden * y)
                        .attr("stroke-width", 1).attr("stroke", "red").style("opacity", -nn.hiddenLayers[i].weights[j][y]/opacity);

                }

            }

        }
    }
    //output lines
    for (var j = 0; j < nn.hiddenLayers[nn.hiddenLayers.length - 1].nodes; j++) {
        for (var y = 0; y < nn.hiddenLayers[nn.hiddenLayers.length - 1].nextLayerNodes; y++) {
            if (nn.hiddenLayers[i].weights[j][y] > 0) {
                svg.append("line").attr("x1", paddingLayers * 2 + paddingLayers * i).attr("y1", paddingHidden + paddingHidden * j).attr("x2", paddingLayers * (nn.layers * 1 + 2)).attr("y2", paddingOutput + paddingOutput * y)
                    .attr("stroke-width", 1).attr("stroke", "black").style("opacity", nn.hiddenLayers[i].weights[j][y]/opacity);
            } else {
                svg.append("line").attr("x1", paddingLayers * 2 + paddingLayers * i).attr("y1", paddingHidden + paddingHidden * j).attr("x2", paddingLayers * (nn.layers * 1 + 2)).attr("y2", paddingOutput + paddingOutput * y)
                    .attr("stroke-width", 1).attr("stroke", "red").style("opacity", -nn.hiddenLayers[i].weights[j][y]/opacity);

            }

        }

    }
}

