Vue.component('Timer', {
  template: `
  <div class="card-body">
  <div class="row" v-show="statusType !== 'expired'">
      <div class="day col-6 col-md-3">
        <p class="format">{{ wordString.day }}</p>
        <h1 class="number">{{ days }}</h1>
      </div>
      <div class="hour col-6 col-md-3">
        <p class="format">{{ wordString.hours }}</p>
        <h1 class="number">{{ hours }}</h1>
      </div>
      <div class="min col-6 col-md-3">
        <p class="format">{{ wordString.minutes }}</p>
        <h1 class="number">{{ minutes }}</h1>
      </div>
      <div class="sec col-6 col-md-3">
        <p class="format">{{ wordString.seconds }}</p>
        <h1 class="number">{{ seconds }}</h1>
      </div>
  </div>
  <div class="message badge-palette-8 message rounded">{{ message }}</div>
  <div v-show="false" class="status-tag" :class="statusType">{{ statusText }}</div>
</div>
`,
  props: ['starttime', 'endtime', 'trans'],
  data: function () {
    return {
      timer: "",
      wordString: {},
      start: "",
      end: "",
      interval: "",
      days: "",
      minutes: "",
      hours: "",
      seconds: "",
      message: "",
      statusType: "",
      statusText: "",

    };
  },
  created: function () {
    this.wordString = JSON.parse(this.trans);
  },
  mounted() {
    this.start = new Date(this.starttime).getTime();
    this.end = new Date(this.endtime).getTime();
    // Update the count down every 1 second
    this.timerCount(this.start, this.end);
    this.interval = setInterval(() => {
      this.timerCount(this.start, this.end);
    }, 1000);
  },
  methods: {
    timerCount: function (start, end) {
      // Get todays date and time
      var now = new Date().getTime();

      // Find the distance between now an the count down date
      var distance = start - now;
      var passTime = end - now;

      if (distance < 0 && passTime < 0) {
        this.message = this.wordString.expired;
        this.statusType = "expired";
        this.statusText = this.wordString.status.expired;
        clearInterval(this.interval);
        return;

      } else if (distance < 0 && passTime > 0) {
        this.calcTime(passTime);
        this.message = this.wordString.running;
        this.statusType = "running";
        this.statusText = this.wordString.status.running;

      } else if (distance > 0 && passTime > 0) {
        this.calcTime(distance);
        this.message = this.wordString.upcoming;
        this.statusType = "upcoming";
        this.statusText = this.wordString.status.upcoming;
      }
    },
    calcTime: function (dist) {
      // Time calculations for days, hours, minutes and seconds
      this.days = Math.floor(dist / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((dist % (1000 * 60)) / 1000);
    }

  }
});

new Vue({
  el: "#timer",
});