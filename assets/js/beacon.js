
(function(){
  const $ = sel => document.querySelector(sel);
  let audioCtx = null, timer = null, playing = false;
  const notes = [261.63, 329.63, 392.00, 523.25, 493.88, 392.00, 329.63, 293.66];
  const harmony = [196.00, 246.94, 261.63, 329.63, 293.66, 246.94, 220.00, 196.00];
  function tone(freq, when, dur, gainValue){
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine'; osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, when);
    gain.gain.exponentialRampToValueAtTime(gainValue, when + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, when + dur);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start(when); osc.stop(when + dur + .04);
  }
  function step(){
    if(!audioCtx) return;
    const now = audioCtx.currentTime;
    const i = Math.floor((Date.now()/700) % notes.length);
    tone(notes[i], now, .48, .035);
    tone(harmony[i], now+.12, .55, .018);
  }
  window.toggleCounterpoint = function(){
    const btn = $('#sound-toggle');
    if(!playing){
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      step(); timer = setInterval(step, 720); playing = true;
      if(btn) btn.textContent = 'Silence the Counterpoint';
    } else {
      clearInterval(timer); timer = null; playing = false;
      if(btn) btn.textContent = 'Begin the Counterpoint';
    }
  }
  window.generateContribution = function(){
    const fields = ['persona','path','type','title','summary','source','status','risks','consent'];
    const data = {};
    fields.forEach(id => { const el = document.getElementById(id); data[id] = el ? el.value.trim() : ''; });
    data.packet_id = 'NB-' + new Date().toISOString().replace(/[-:.TZ]/g,'').slice(0,14);
    data.created_utc = new Date().toISOString();
    data.archive_firewall = 'This is a provisional contribution packet. It does not update the archive until ReKai approves it.';
    const json = JSON.stringify(data, null, 2);
    const md = `# Noble Beacon Contribution Packet\n\nPacket ID: ${data.packet_id}\nCreated UTC: ${data.created_utc}\n\n## Contributor\nPersona: ${data.persona}\nPath: ${data.path}\nConsent: ${data.consent}\n\n## Contribution\nType: ${data.type}\nTitle: ${data.title}\nStatus guess: ${data.status}\n\n## Summary\n${data.summary}\n\n## Source / Evidence\n${data.source}\n\n## Risks / Warding Notes\n${data.risks}\n\n## Archive Firewall\n${data.archive_firewall}\n`;
    const out = document.getElementById('packet-output');
    if(out) out.textContent = md + '\n\n--- JSON ---\n' + json;
    const blob = new Blob([json], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const dl = document.getElementById('download-json');
    if(dl){ dl.href = url; dl.download = data.packet_id + '.json'; dl.style.display = 'inline-block'; }
  }
})();
