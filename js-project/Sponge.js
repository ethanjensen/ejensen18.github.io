class Sponge
{
  constructor(x, y, z, size)
  {
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = size;
    this.leaves = [];
  }

  //displays the menger sponge to the canvas.
  display()
  {
    //if the sponge is a level 0 sponge, display a box.
    if (this.leaves.length == 0)
    {
      push();
      translate(this.x, this.y, this.z);
      box(this.size, this.size, this.size);
      pop();
    }
    else //cascade the display to the children sponges.
    {
      for (let i = 0; i < this.leaves.length; i++)
      {
        this.leaves[i].display();
      }
    }
  }

  //Adds an iteration to the menger sponge
  explode()
  {
    //if a child node, make 20 new sponge children.
    if (this.leaves.length == 0)
    {
      for (let i = -1; i <= 1; i++)
      {
        for (let j = -1; j <= 1; j++)
        {
          for (let k = -1; k <= 1; k++)
          {
            if (Math.abs(i) + Math.abs(j) + Math.abs(k) > 1)
            {
              this.leaves.push(new Sponge(this.x + i*this.size/3, this.y + j*this.size/3, this.z + k*this.size/3, this.size/3));
            }
          }
        }
      }
    }
    else //cascade the explosion down to each child sponge.
    {
      for (let i = 0; i < this.leaves.length; i++)
      {
        this.leaves[i].explode();
      }
    }
  }
}
