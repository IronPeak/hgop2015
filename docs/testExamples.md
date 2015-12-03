Test Examples
=============
#Create Game
<TABLE>
  <TR>
    <TH colspan="2">
      Test Name
    </TH>
  </TR>
  <TR>
    <TD>Given</TD>
    <TD>
      []
    </TD>
  </TR>
  <TR>
    <TD>When</TD>
    <TD>
    <Table>
      <TR>
        <TD>id</TD>
        <TD>1234</TD>
      </TR>
      <TR>
        <TD>comm</TD>
        <TD>CreateGame</TD>
      </TR>
      <TR>
        <TD>userName</TD>
        <TD>Gulli</TD>
      </TR>
      <TR>
        <TD>name</TD>
        <TD>TheFirstGame</TD>
      </TR>
      <TR>
        <TD>timeStamp</TD>
        <TD>2015.12.02T11:29:44</TD>
      </TR>
    </Table>
    </TD>
  </TR>
  <TR>
    <TD>Then</TD>
    <TD>
    <Table>
      <TR>
        <TD>event</TD>
        <TD>GameCreated</TD>
      </TR>
      <TR>
        <TD>userName</TD>
        <TD>Gulli</TD>
      </TR>
      <TR>
        <TD>timeStamp</TD>
        <TD>2015.12.02T11:29:44</TD>
      </TR>
    </Table>
    </TD>
  </TR>
  <TR>
    <TD>
      Call
    </TD>
    <TD>
      tictactoeCommandHandler(given).executeCommand(when);
    </TD>
  </TR>
</TABLE>



#Join Game

#Make Move
