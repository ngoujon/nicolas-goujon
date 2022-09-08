<?php
require_once('nav.php');
?>
<div class="home">
  <div class="profile">
    <div class="container text-center">
      <div class="row justify-content-md-center">
        <div class="col-lg-4">
          <?php
          if (isset($_GET['mail']) && $_GET['mail']=="envoye") {
            ?>
            <div class="alert alert-success" role="alert">
              Le message a bien été envoyé
            </div>
            <?php
          }
          elseif (isset($_GET['mail']) && $_GET['mail']=="erreur") {
            ?>
            <div class="alert alert-danger" role="alert">
              Le message n'a pas pu être envoyé
            </div>
            <?php
          }
          else {

          }
          ?>
        </div>
      </div>
    </div>
    <p>
      <i class="bi bi-person-workspace profilePicto"></i>
    </p>
    <p>
      <h1 class="name">Nicolas GOUJON</h1>
    </p>
    <p>
      <h2 class="title" >Développeur Web et Web mobile</h2>
    </p>
    <a href="data/doc/CV_Nicolas-GOUJON.pdf" class="cv" target="_blank">Consulter mon CV</a>
  </div>
</div>
<div class="professionnal" id="bio">
  <div class="container text-center experience">
    <div class="row">
      <div class="col-lg-5">
        <div class="imgSite">
        </div>
      </div>
      <div class="col-lg-6 expDescribe">
        Mon expérience au sein d'une entreprise conception de logiciels SaaS a fait développer mes compétences sur ce type de logiciel, sur la qualité logicielle, et sur les échanges avec le client en phase de conception et de maintenance.<br>
        <br>
        J’ai également acquis une bonne connaissance de la gestion de projet et de l’organisation d’une équipe de développement. En effet, j’ai eu l’occasion de gérer plusieurs projets de développement de logiciels SaaS, en particulier sur la phase de conception et de développement. J’ai ainsi pu mettre en place plusieurs processus et outils de qualité logicielle.<br>
        <br>
        En outre, j’ai également travaillé en étroite collaboration avec les clients, afin de comprendre leurs besoins et de leur fournir un logiciel SaaS adapté à leurs attentes. J’ai ainsi pu développer une bonne compréhension des enjeux et des contraintes liés à ce type de projet.
        <div class="expBar">

          <p class="techLeft"># Engineering</p>
          <p class="techLeft"># SaaS</p>
          <p class="techLeft"># Relation client</p>
          <p class="techLeft"># ERP</p>
          <p class="techLeft"># CRM</p>
        </div>
      </div>
    </div>
  </div>
  <div class="container text-center experience">
    <div class="row">
      <div class="col-lg-6 expDescribe">
        Fort de plus de 5 années d’expérience dans la conception de site-web, j’ai participé à toutes les étapes de conception : de la définition du besoin jusqu’à la maintenance du site. Etant à mon compte, j’ai également eu à porter tous les aspects de la gestion d’une micro-entreprise, d’un point de vue financier, administratif et gestion des ressources.<br>
        <br>
        Mes clients ont été variés : des institutionnels, des associations, des collectivités locales, des entreprises et des particuliers. J’ai ainsi pu mettre en œuvre des projets de toute nature, avec des équipes et des contraintes différentes. Cela m’a permis de développer une grande adaptabilité et une bonne capacité à gérer les imprévus.<br>
        <br>
        Aujourd’hui, je souhaite mettre mes compétences au service d’une entreprise dynamique, en quête de nouvelles technologies pour améliorer ses processus. J’ai envie de m’investir dans un projet à long terme et de pouvoir apporter ma contribution à la croissance d’une entreprise.
        <div class="expBar">
          <p class="techRight"># Gestion de projet</p>
          <p class="techRight"># Definition des besoins</p>
          <p class="techRight"># Web Design</p>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="imgSoft">
        </div>
      </div>
    </div>
  </div>
</div>
<div class="bio" >
  <div class="container text-center">
    <div class="row justify-content-md-center ">
      <div class="col-lg-2 ">
        <p>
          <div class="pictureProfile"></div>
        </p>
      </div>
      <div class="col-lg-8">
        <div class="aboutme">
          <span class="bigLetter">❝</span> Passionné d'informatique depuis toujours, je me suis très vite orienté vers la programmation web dès le plus jeune âge étant donné que c'est là que se trouve toute l'innovation et les dernières avancées technologiques. J'ai donc décidé de faire de mon hobby un métier et je me suis lancé dans la création de sites internet professionnels.  <span class="bigLetter">❞</span>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="stack" id="stack">
  <div class="container text-center experience">
    <div class="row">
      <div class="col-lg-12">
        <h2 class="labelStack">STACK</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-3 stackCell ">
        <i class="bi bi-front stackIco"></i>
        <p class="stackName">Front-End</p>
        <p class="stackLine">HTML</p>
        <p class="stackLine">CSS</p>
      </div>
      <div class="col-lg-3 stackCell">
        <i class="bi bi-back stackIco"></i>
        <p class="stackName">Back-End</p>
        <p class="stackLine">PHP</p>
        <p class="stackLine">MySQL</p>
        <p class="stackLine">SQL</p>
      </div>
      <div class="col-lg-3 stackCell">
        <i class="bi bi-layout-wtf stackIco"></i>
        <p class="stackName">Design</p>
        <p class="stackLine">Security by Design</p>
        <p class="stackLine">Adobe XD</p>
        <p class="stackLine">UI / UX</p>
      </div>
      <div class="col-lg-3 stackCell">
        <i class="bi bi-list-ol stackIco"></i>
        <p class="stackName">Referencement</p>
        <p class="stackLine">Google Analytics</p>
        <p class="stackLine">SEO - SEA - SMO</p>
        <p class="stackLine">Rank tracker</p>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-3 stackCell ">
        <i class="bi bi-phone stackIco"></i>
        <p class="stackName">Responsive</p>
        <p class="stackLine">Bootstrap</p>
      </div>
      <div class="col-lg-3 stackCell">
        <i class="bi bi-bar-chart-steps stackIco"></i>
        <p class="stackName">Agile</p>
        <p class="stackLine">GitHub</p>
        <p class="stackLine">MindView</p>
        <p class="stackLine">Kanban</p>
        <p class="stackLine">Gantt</p>
      </div>
      <div class="col-lg-3 stackCell">
        <i class="bi bi-terminal stackIco"></i>
        <p class="stackName">Terminal</p>
        <p class="stackLine">MS DOS</p>
        <p class="stackLine">UNIX</p>
        <p class="stackLine">SSH</p>
      </div>
      <div class="col-lg-3 stackCell">
        <i class="bi bi-cpu stackIco"></i>
        <p class="stackName">Engineering</p>
        <p class="stackLine">Application Web / SaaS</p>
        <p class="stackLine">UML Diagram</p>
      </div>
    </div>
  </div>
</div>
<div class="school" id="formation">
  <div class="container text-center">
    <div class="row justify-content-md-center ">
      <div class="col-lg-12">
        <p class="schoolIco"><i class="bi bi-award"></i></p>
        <p class="schoolName">Titre Professionnel </p>
        <p class="schoolSub">Développeur web et web mobile</p>
        <p class="schoolSub">Graduate Développeur web full stack Promo ELLENBY </p>
        <p class="schoolText"></p>
      </div>
    </div>
    <div class="row justify-content-md-center ">
      <div class="col-lg-12">
        <p class="schoolIco"><i class="bi bi-bookmark-check"></i></p>
        <p class="schoolName">Brevet de Technicien Supérieur </p>
        <p class="schoolSub">Système Numérique</p>
        <p class="schoolSub">Option (B) Électronique et Communication</p>
        <p class="schoolText"></p>
      </div>
    </div>
    <div class="row justify-content-md-center ">
      <div class="col-lg-12">
        <p class="schoolIco"><i class="bi bi-mortarboard"></i></p>
        <p class="schoolName">Baccalauréat </p>
        <p class="schoolSub">Sciences et Technologies de l’Industrie et du Développement Durable</p>
        <p class="schoolSub">Option Système d’Information et du Numérique</p>
        <p class="schoolText"></p>
      </div>
    </div>
  </div>
</div>
<div class="hireme">
  <div class="container">
    <h2 class="labelHireme text-center">Recrutez-moi</h2>
    <div class="row justify-content-md-center">
      <div class="col-lg-5">
        <div class="hiremeLine">
          <i class="bi bi-envelope-paper hiremeIco"></i>
          <a href="mailto:pro@ngoujon.net" class="white"><p class="hiremeLabel"> pro@ngoujon.net</p></a>
        </div>
        <div class="hiremeLine">
          <i class="bi bi-telephone hiremeIco"></i>
          <p class="hiremeLabel">+ 33 (0) 7 48 89 11 01</p>
        </div>
        <div class="hiremeLine">
          <i class="bi bi-whatsapp hiremeIco"></i>
          <p class="hiremeLabel"> + 33 (0) 6 95 35 28 12</p>
        </div>
        <div class="hiremeLine">
          <i class="bi bi-skype hiremeIco"></i>
          <p class="hiremeLabel">nicolas.goujon18</p>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="workspace" id="projets">
  <div class="container text-center">
    <h2 class="labelProjets">Projets</h2>
    <div class="row justify-content-md-center">
      <div class="col-lg-12">
        <div class="projetLogoHydroseed"></div>
        <p class="projetName">HYDROSEED</p>
        <a href="http://www.hydroseed.nc" target="_blank"><p class="projectLink">www.hydroseed.nc <i class="bi bi-box-arrow-up-right externalLink"></i></p></a>
        <p class="projetText">La société HYDROSEED s’intéresse au génie végétal dans le secteur du génie civil.</p>
        <p class="projetText"> Nous étudions toutes les solutions techniques pour la protection de l’environnement, notamment pour le confortement des talus et la stabilisation de la surface des pentes.</p>
      </div>
      <div class="col-lg-12">
        <div class="projetLogoGabions"></div>
        <p class="projetName">GABIONS</p>
        <a href="http://www.gabions.nc" target="_blank"><p class="projectLink">www.gabions.nc <i class="bi bi-box-arrow-up-right externalLink"></i></p></a>
        <p class="projetText">Nous réalisons des murs de soutènement en gabions. Ce mur « poids » permet généralement de gagner de la surface utilisable autour de votre maison d’habitation. Ces travaux réalisés dans les règles de l’art sont déductibles des impôts comme une amélioration durable du patrimoine immobilier.</p>
      </div>
      <div class="col-lg-12">
        <div class="projetLogoSkeye"></div>
        <p class="projetName">SKEYE</p>
        <a href="http://www.skeye.nc" target="_blank"><p class="projectLink">www.skeye.nc <i class="bi bi-box-arrow-up-right externalLink"></i></p></a>
        <p class="projetText">Plus pratique, plus économique et plus écologique que l’hélicoptère, l’avion ou l’ULM, le drone permet de réaliser des photos ou des vidéos aériennes dans des endroits inaccessibles à toute autre machine, avec une mise en œuvre extrêmement simple et rapide, tout en limitant les risques aux personnes et les nuisances sonores.
          Durant sa période de vol, la caméra embarquée autorise la capture d’images ou de vidéos aériennes en temps réel, dans des zones sensibles ou difficiles d’accès.</p>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</div>
<div class="contact" id="contact">
  <div class="container text-center">
    <h2 class="labelContact">Contactez-moi</h2>
    <div class="row justify-content-md-center">
      <div class="col-lg-6">
        <form method="post" action="data/core.php" >
          <div class="row mb-3">
            <div class="col">
              <input type="text" name="nom" class="form-control" placeholder="Nom" aria-label="First name" required>
            </div>
            <div class="col">
              <input type="text" name="prenom" class="form-control" placeholder="Prénom" aria-label="Last name" required>
            </div>
          </div>
          <div class="row">
            <div class="mb-3">
              <input type="email" name="email" class="form-control" id="exampleFormControlInput1" placeholder="email@example.com" required>
            </div>
            <div class="mb-3">
              <textarea class="form-control" name="message" id="validationTextarea" placeholder="Saissisez votre message ... " required rows="15"></textarea>
              <div class="invalid-feedback">
              </div>
            </div>
            <div class="col-12">
              <button type="submit" class="btnContact"><i class="bi bi-send"></i></button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<?php
require_once('footer.php');
?>
