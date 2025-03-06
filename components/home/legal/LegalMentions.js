import { Modal } from "react-bootstrap";

export const LegalMentions = ({ show, setShow }) => {
  return (
    <Modal show={show} onHide={() => setShow(!show)} className="text_dark" size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Mentions Légales</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique, dite L.C.E.N., nous portons à la connaissance des utilisateurs et visiteurs du site :<a href="http://www.quadratik.fr">www.quadratik.fr</a>
          les informations suivantes :
        </p>

        <p className="text-uppercase ft2 m-3 ft800">1. Informations légales :</p>

        <p>
          Statut du propriétaire :<span className="text-uppercase ft8 ft800"> professionel</span>

          Le Propriétaire est : <span className="text-uppercase ft8 ft800">Fanch Cavellec</span>
          <br />
          Adresse postale du propriétaire : <span className="text-uppercase ft8 ft800">lieu dit la giraudais 35520 La Mezière</span>
          <br />
          <br />
          Le Créateur du site est : <span className="text-uppercase ft8 ft800">quadratik.fr</span>
          <br />
          Le Responsable de la publication est :<span className="text-uppercase ft8 ft800">Cavellec Fanch</span>
          <br />
          Contacter le responsable de la publication :<span className="text-uppercase ft8 ft800">atelier@quadratik.fr</span>
          <br />
          Le responsable de la publication est une<span className="text-uppercase ft8 ft800">personne morale</span>
          <br />
          <br />
          Le Webmaster est :<span className="text-uppercase ft8 ft800">Cavellec Fanch</span>
          <br />
          Contacter le Webmaster :
          <span className="text-uppercase ft8 ft800">
            <a href="mailto:contact@quadratik.fr?subject=Contact a partir des mentions lÃ©gales via le site www.quadratik.fr">atelier@quadratik.fr</a>
          </span>
          <br />
          L’hebergeur du site est :<span className="text-uppercase ft8 ft800">OVH https://www.ovh.com/fr/ 59100 Roubaix</span>
          <br />
        </p>
   
        <p>
          <span className="text-uppercase ft2 m-3 ft800">2. Présentation et principe :</span>
        </p>
        <p>
          Est désigné ci-après :<span className="text-uppercase ft8 ft800">Utilisateur</span>, tout internaute se connectant et utilisant le site susnommé :<a href="http://www.quadratik.fr">www.quadratik.fr</a>.<br />
          Le site
          <span className="text-uppercase ft8 ft800"> www.quadratik.fr </span>
          regroupe un ensemble de services, dans l'état, mis à la disposition des utilisateurs. Il est ici précisé que ces derniers doivent rester courtois et faire preuve de bonne foi tant envers les autres utilisateurs qu'envers le webmaster du site www.quadratik.fr. Le site www.quadratik.fr est
          mis à jour régulièrement par Cavellec Fanch.
          <br />
          L'entreprise Quadratik.fr s’efforce de fournir sur le site www.quadratik.fr des informations les plus précises possibles (sous réserve de modifications apportées depuis leur mise en ligne), mais ne saurait garantir l'exactitude, la complétude et l'actualité des informations diffusées sur
          son site, qu’elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations. En conséquence, l'utilisateur reconnaît utiliser ces informations données (à titre indicatif, non exhaustives et susceptibles d'évoluer) sous sa responsabilité exclusive.
        </p>
        <p></p>
        <p>
          <span className="text-uppercase ft2 m-3 ft800">3. Accessibilité :</span>
          <br />
          <br />
          Le site www.quadratik.fr est par principe accessible aux utilisateurs 24/24h, 7/7j, sauf interruption, programmée ou non, pour les besoins de sa maintenance ou en cas de force majeure. En cas d’impossibilité d’accès au service, www.quadratik.fr s’engage à faire son maximum afin de rétablir
          l’accès au service et s’efforcera alors de communiquer préalablement aux utilisateurs les dates et heures de l’intervention. N’étant soumis qu’à une obligation de moyen, www.quadratik.fr ne saurait être tenu pour responsable de tout dommage, quelle qu’en soit la nature, résultant d’une
          indisponibilité du service.
        </p>
        <p></p>
        <p>
          <span className="text-uppercase ft2 m-3 ft800">4. Propriété intellectuelle :</span>
        </p>
        <p>
          <br />
          L'entreprise Quadratik.fr est propriétaire exclusif de tous les droits de propriété intellectuelle ou détient les droits d’usage sur tous les éléments accessibles sur le site, tant sur la structure que sur les textes, images, graphismes, logo, icônes, sons, logiciels…
          <br />
          Toute reproduction totale ou partielle du site www.quadratik.fr, représentation, modification, publication, adaptation totale ou partielle de l'un quelconque de ces éléments, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de l'entreprise
          Quadratik.fr, propriétaire du site à l'email : atelier@quadratik.fr, à défaut elle sera considérée comme constitutive d’une contrefaçon et passible de poursuite conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.
        </p>
        <p>
          <br />
          <span className="text-uppercase ft2 m-3 ft800">5. Liens hypertextes et cookies :</span>
          <br />
          <br />
          Le site www.quadratik.fr contient un certain nombre de hypertextes vers d’autres sites (partenaires, informations …) mis en place avec l’autorisation de l'entreprise Quadratik.fr. Cependant, l'entreprise Quadratik.fr n’a pas la possibilité de vérifier l'ensemble du contenu des sites ainsi
          visités et décline donc toute responsabilité de ce fait quand aux risques éventuels de contenus illicites.
          <br />
          L’utilisateur est informé que lors de ses visites sur le site www.quadratik.fr, un ou des cookies sont susceptibles de s’installer automatiquement sur son ordinateur par l'intermédiaire de son logiciel de navigation. Un cookie est un bloc de données qui ne permet pas d'identifier
          l'utilisateur, mais qui enregistre des informations relatives à la navigation de celui-ci sur le site.
          <br />
          Le paramétrage du logiciel de navigation permet d’informer de la présence de cookie et éventuellement, de la refuser de la manière décrite à l’adresse suivante :<a href="http://www.cnil.fr">www.cnil.fr</a>. L’utilisateur peut toutefois configurer le navigateur de son ordinateur pour
          refuser l’installation des cookies, sachant que le refus d'installation d'un cookie peut entraîner l’impossibilité d’accéder à certains services. Pour tout bloquage des cookies, tapez dans votre moteur de recherche : bloquage des cookies sous IE ou firefox et suivez les instructions en
          fonction de votre version.
        </p>
        <p>
          <br />
          <span className="text-uppercase ft2 m-3 ft800">6. Protection des biens et des personnes - gestion des données personnelles :</span>
          <br />
          <br />
          En France, les données personnelles sont notamment protégées par la loi n° 78-87 du 6 janvier 1978, la loi n° 2004-801 du 6 août 2004, l'article L. 226-13 du Code pénal et la Directive Européenne du 24 octobre 1995.
        </p>
        <p>
          Sur le site www.quadratik.fr, l'entreprise Quadratik.fr ne collecte des informations personnelles ( suivant l'article 4 loi n°78-17 du 06 janvier 1978) relatives à l'utilisateur que pour le besoin de certains services proposés par le site www.quadratik.fr. L'utilisateur fournit ces
          informations en toute connaissance de cause, notamment lorsqu'il procède par lui-même à leur saisie. Il est alors précisé à l'utilisateur du site www.quadratik.fr l’obligation ou non de fournir ces informations.
          <br />
          Conformément aux dispositions des articles 38 et suivants de la loi 78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés, tout utilisateur dispose d’un droit d’accès, de rectification, de suppression et d’opposition aux données personnelles le concernant. Pour
          l’exercer, adressez votre demande à www.quadratik.fr par email :
          <span className="text-uppercase ft8 ft800">
            <a href="mailto:contact@quadratik.fr?subject=atelier ï¿½ partir des mentions lï¿½gales via le site www.quadratik.fr">atelier@quadratik.fr</a>
          </span>
          ou par écrit dûment signée, accompagnée d’une copie du titre d’identité avec signature du titulaire de la pièce, en précisant l’adresse à laquelle la réponse doit être envoyée.
        </p>
        <p>
          Aucune information personnelle de l'utilisateur du site www.quadratik.fr n'est publiée à l'insu de l'utilisateur, échangée, transférée, cédée ou vendue sur un support quelconque à des tiers. Seule l'hypothèse du rachat du site www.quadratik.fr et de ses droits autorise l'entreprise
          Quadratik.fr à transmettre les dites informations à l'éventuel acquéreur qui serait à son tour tenu à la même obligation de conservation et de modification des données vis à vis de l'utilisateur du site www.quadratik.fr.
          <br />
          Le site www.quadratik.fr est déclaré à la CNIL sous le numéro numero cnil.
        </p>
        <p>Les bases de données sont protégées par les dispositions de la loi du 1er juillet 1998 transposant la directive 96/9 du 11 mars 1996 relative à la protection juridique des bases de données.</p>
      </Modal.Body>
    </Modal>
  );
};
