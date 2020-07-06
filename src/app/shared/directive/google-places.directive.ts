import { Directive, ElementRef, OnInit, EventEmitter, Output, Input } from '@angular/core';
declare const google: any;
@Directive({
  selector: '[google-place]'
})
export class GooglePlacesDirective {
  @Input() addressid: any;
  private element: HTMLInputElement;
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  constructor(private elRef: ElementRef) {
    //elRef will get a reference to the element where
    //the directive is placed
    this.element = elRef.nativeElement;
  }

  ngOnInit() {
    const autocomplete = new google.maps.places.Autocomplete(this.element);
    //Event listener to monitor place changes in the input
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      //Emit the new address object for the updated place
     // this.onSelect.emit(this.getFormattedAddress(autocomplete.getPlace()));
    });
  }
  getFormattedAddress(place) {
    //@params: place - Google Autocomplete place object
    //@returns: location_obj - An address object in human readable format
    const location_obj = this.convertPlaceToFriendlyObject(place);
    return { tmpaddressid: this.addressid, ngaddressdetailvalue: location_obj };
  }
  convertPlaceToFriendlyObject(place) {
    var result = undefined;
    if (place) {
      result = {};
      for (var i = 0, l = place.address_components.length; i < l; i++) {
        result[place.address_components[i].types[0]] = place.address_components[i].long_name;
      }
      result.name = place.name;
    }
    return result;
  }
}
