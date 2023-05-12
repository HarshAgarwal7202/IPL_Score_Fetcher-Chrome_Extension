async function getMatchData() {
  return await fetch(
    "https://api.cricapi.com/v1/currentMatches?apikey=80c01ad9-5d92-4ce9-84e8-8a31aca8032e&offset=0"
  )
    //
    .then((data) => data.json())
    .then((data) => {
      if (data.status != "success") return;

      const matchesList = data.data;

      if (!matchesList) return [];
      const relevantData = matchesList.filter(
        (match) => match.series_id == "c75f8952-74d4-416f-b7b4-7da4b4e3ae6e"
      )[0];
      document.getElementById("iplMatch").innerHTML = [relevantData]
        .map(
          (match) => `
      <p><b>${match.teamInfo[0].shortname} vs ${match.teamInfo[1].shortname}</b></p>
      <div class="score">
        <p><img src="${match.teamInfo[0].img}" alt="Team2" style="
        height: 20px;position:relative;top:4px;"/>  ${match.score[0].r}-${match.score[0].w} (${match.score[0].o})</p>
        <p><img src="${match.teamInfo[1].img}" alt="Team2" style="
        height: 20px;position:relative;top:4px;"/> ${match.score[1].r}-${match.score[1].w} (${match.score[1].o})</p>
      </div>
      <p id="matchstatus">${match.status}</p>
      <p id="matchVenue">${match.venue}</p>
    `
        )
        .join("");
      return relevantData;
    })
    .catch((e) => console.log(e));
}

getMatchData();

// https://api.cricapi.com/v1/currentMatches?apikey=e974702d-6fcc-4948-bced-cc07b8c05d96&offset=0
