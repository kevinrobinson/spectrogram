/**
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define(['./SliderBar', 'Tone/core/Transport'], function(SliderBar, Transport) {

	var Slider = function(container) {

		this.sliderContainer = document.createElement('div');
		this.sliderContainer.id = 'SliderContainer';
		container.appendChild(this.sliderContainer);

		this.slider = new SliderBar(this.sliderContainer, 70, 200, Transport.bpm.value);
		this.slider.onchange = this._changed.bind(this);

		this.rabbit = document.createElement('div');
		this.rabbit.id = 'Hare';
		this.rabbit.classList.add("icon-svg_fast_man");
		this.sliderContainer.appendChild(this.rabbit);

		this.tortoise = document.createElement('div');
		this.tortoise.id = 'Tortoise';
		this.tortoise.classList.add("icon-svg_slow_man");
		this.sliderContainer.appendChild(this.tortoise);

	};

	Slider.prototype._changed = function(tempo) {
		Transport.bpm.value = tempo;
	};

	return Slider;
});
